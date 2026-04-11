export type UserRole = 'owner' | 'manager' | 'staff';
export type LocationType = 'storefront' | 'warehouse' | 'popup' | 'online';
export type ProductStatus = 'active' | 'draft' | 'archived';
export type ConditionType = 'new' | 'like_new' | 'good' | 'fair' | 'poor' | 'refurbished';
export type MovementType = 'sale' | 'return' | 'adjustment' | 'transfer' | 'received' | 'damaged' | 'marketplace_sale' | 'reserved';
export type OrderStatus = 'pending' | 'completed' | 'refunded' | 'partially_refunded' | 'cancelled';
export type OrderChannel = 'pos' | 'marketplace' | 'shopify' | 'ebay' | 'website' | 'manual';
export type PaymentMethod = 'card' | 'cash' | 'square' | 'marketplace_checkout' | 'other';
export type ListingStatus = 'draft' | 'active' | 'sold' | 'expired' | 'removed';
export type MarketplacePlatform = 'facebook' | 'ebay' | 'shopify' | 'offerup' | 'craigslist';

export interface Business {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  description?: string;
  address_line1?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  logo_url?: string;
  timezone: string;
  currency: string;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  category_id?: string;
  sku?: string;
  barcode?: string;
  name: string;
  description?: string;
  condition: ConditionType;
  status: ProductStatus;
  cost_price?: number;
  retail_price: number;
  sale_price?: number;
  weight_oz?: number;
  images: string[];
  tags: string[];
  ai_suggested_price?: number;
  ai_suggested_description?: string;
  is_taxable: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryLevel {
  id: string;
  product_id: string;
  location_id: string;
  quantity: number;
  reserved_quantity: number;
  reorder_point: number;
  reorder_quantity: number;
  last_counted_at?: string;
  updated_at: string;
}

export interface Order {
  id: string;
  business_id: string;
  location_id?: string;
  customer_id?: string;
  order_number: string;
  channel: OrderChannel;
  status: OrderStatus;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total: number;
  payment_method?: PaymentMethod;
  payment_reference?: string;
  notes?: string;
  metadata: Record<string, unknown>;
  created_by?: string;
  created_at: string;
  completed_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total: number;
}

export interface MarketplaceListing {
  id: string;
  business_id: string;
  product_id: string;
  platform: MarketplacePlatform;
  platform_listing_id?: string;
  status: ListingStatus;
  title: string;
  description?: string;
  price: number;
  ai_generated_title?: string;
  ai_generated_description?: string;
  ai_suggested_price?: number;
  images: string[];
  listing_url?: string;
  views: number;
  inquiries: number;
  pickup_location_id?: string;
  published_at?: string;
  sold_at?: string;
  created_at: string;
}

export interface AiInsight {
  id: string;
  business_id: string;
  product_id?: string;
  insight_type: string;
  title: string;
  description?: string;
  confidence?: number;
  data: Record<string, unknown>;
  is_read: boolean;
  is_actioned: boolean;
  created_at: string;
}

export interface Location {
  id: string;
  business_id: string;
  name: string;
  type: LocationType;
  address_line1?: string;
  city?: string;
  state?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
  is_active: boolean;
}

export interface Customer {
  id: string;
  business_id: string;
  name: string;
  email?: string;
  phone?: string;
  total_spent: number;
  visit_count: number;
  last_visit_at?: string;
  tags: string[];
}

// Extended types with relations
export interface ProductWithInventory extends Product {
  inventory_levels: InventoryLevel[];
  category?: { id: string; name: string };
}

export interface OrderWithItems extends Order {
  order_items: (OrderItem & { product: Product })[];
  customer?: Customer;
  location?: Location;
}

export interface ListingWithProduct extends MarketplaceListing {
  product: Product;
  pickup_location?: Location;
}
