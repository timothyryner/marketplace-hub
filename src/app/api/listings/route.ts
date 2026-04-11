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
    .from('marketplace_listings')
    .select(`
      *,
      product:products(id, name, sku, images, retail_price),
      pickup_location:locations(id, name, city, state)
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

  const { data, error } = await supabase
    .from('marketplace_listings')
    .insert({
      business_id: body.business_id,
      product_id: body.product_id,
      platform: body.platform,
      title: body.title,
      description: body.description,
      price: body.price,
      status: body.status || 'draft',
      images: body.images || [],
      pickup_location_id: body.pickup_location_id || null,
      ai_generated_title: body.ai_generated_title || null,
      ai_generated_description: body.ai_generated_description || null,
      ai_suggested_price: body.ai_suggested_price || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'Listing id required' }, { status: 400 });
  }

  // If marking as published, set published_at
  if (updates.status === 'active' && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }

  // If marking as sold, set sold_at and update inventory
  if (updates.status === 'sold' && !updates.sold_at) {
    updates.sold_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('marketplace_listings')
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
    return NextResponse.json({ error: 'Listing id required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('marketplace_listings')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
