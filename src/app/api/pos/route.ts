import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Create a POS transaction (order)
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const {
    business_id,
    location_id,
    customer_id,
    items, // Array of { product_id, quantity, unit_price }
    payment_method,
    tax_rate = 0.08613, // Missouri sales tax
    discount_amount = 0,
    notes,
  } = body;

  if (!business_id || !items || items.length === 0) {
    return NextResponse.json(
      { error: 'business_id and items are required' },
      { status: 400 }
    );
  }

  // Calculate totals
  const subtotal = items.reduce(
    (sum: number, item: { quantity: number; unit_price: number }) =>
      sum + item.quantity * item.unit_price,
    0
  );
  const tax_amount = Math.round((subtotal - discount_amount) * tax_rate * 100) / 100;
  const total = Math.round((subtotal - discount_amount + tax_amount) * 100) / 100;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      business_id,
      location_id,
      customer_id: customer_id || null,
      channel: 'pos',
      status: 'completed',
      subtotal,
      tax_amount,
      discount_amount,
      total,
      payment_method: payment_method || 'card',
      notes,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // Create order items
  const orderItems = items.map(
    (item: { product_id: string; quantity: number; unit_price: number }) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount: 0,
      total: item.quantity * item.unit_price,
    })
  );

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // Decrement inventory for each item
  for (const item of items) {
    if (location_id) {
      // Update inventory level
      const { data: inv } = await supabase
        .from('inventory_levels')
        .select('quantity')
        .eq('product_id', item.product_id)
        .eq('location_id', location_id)
        .single();

      if (inv) {
        await supabase
          .from('inventory_levels')
          .update({ quantity: Math.max(0, inv.quantity - item.quantity) })
          .eq('product_id', item.product_id)
          .eq('location_id', location_id);
      }

      // Log inventory movement
      await supabase.from('inventory_movements').insert({
        product_id: item.product_id,
        location_id,
        type: 'sale',
        quantity_change: -item.quantity,
        reference_id: order.id,
        reference_type: 'order',
      });
    }
  }

  return NextResponse.json(order, { status: 201 });
}

// Get orders
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');
  const limit = parseInt(searchParams.get('limit') || '50');

  if (!businessId) {
    return NextResponse.json({ error: 'business_id required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(*, product:products(id, name, sku, images)),
      customer:customers(id, name, email),
      location:locations(id, name)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
