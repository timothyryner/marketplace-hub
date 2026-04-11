import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');

  if (!businessId) {
    return NextResponse.json({ error: 'business_id required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      inventory_levels(*),
      category:categories(id, name)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const { data: product, error: productError } = await supabase
    .from('products')
    .insert({
      business_id: body.business_id,
      name: body.name,
      sku: body.sku || null,
      barcode: body.barcode || null,
      description: body.description || null,
      condition: body.condition || 'new',
      status: body.status || 'active',
      cost_price: body.cost_price || null,
      retail_price: body.retail_price,
      tags: body.tags || [],
      is_taxable: body.is_taxable ?? true,
    })
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // Create initial inventory level at default location
  if (body.location_id && body.initial_quantity !== undefined) {
    await supabase.from('inventory_levels').insert({
      product_id: product.id,
      location_id: body.location_id,
      quantity: body.initial_quantity || 0,
      reorder_point: body.reorder_point || 5,
      reorder_quantity: body.reorder_quantity || 10,
    });
  }

  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Product id required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product id required' }, { status: 400 });
  }

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
