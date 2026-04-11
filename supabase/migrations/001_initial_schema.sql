-- ============================================================
-- MarketplaceHub: Complete Database Schema
-- Supabase / PostgreSQL
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. BUSINESSES (Multi-tenant core)
-- ============================================================
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT DEFAULT 'Lake Saint Louis',
  state TEXT DEFAULT 'MO',
  zip TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  logo_url TEXT,
  timezone TEXT DEFAULT 'America/Chicago',
  currency TEXT DEFAULT 'USD',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. BUSINESS MEMBERS (Role-based access)
-- ============================================================
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'staff');

CREATE TABLE business_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'staff',
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(business_id, user_id)
);

-- ============================================================
-- 3. LOCATIONS (Multi-location support)
-- ============================================================
CREATE TYPE location_type AS ENUM ('storefront', 'warehouse', 'popup', 'online');

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type location_type NOT NULL DEFAULT 'storefront',
  address_line1 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  parent_id UUID REFERENCES categories(id),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, slug)
);

-- ============================================================
-- 5. PRODUCTS (Core inventory)
-- ============================================================
CREATE TYPE product_status AS ENUM ('active', 'draft', 'archived');
CREATE TYPE condition_type AS ENUM ('new', 'like_new', 'good', 'fair', 'poor', 'refurbished');

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  sku TEXT,
  barcode TEXT,
  name TEXT NOT NULL,
  description TEXT,
  condition condition_type DEFAULT 'new',
  status product_status DEFAULT 'active',
  cost_price DECIMAL(10,2),
  retail_price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  weight_oz DECIMAL(8,2),
  dimensions JSONB, -- {length, width, height, unit}
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  ai_suggested_price DECIMAL(10,2),
  ai_suggested_description TEXT,
  is_taxable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_business ON products(business_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_status ON products(status);

-- ============================================================
-- 6. INVENTORY LEVELS (Per-location stock)
-- ============================================================
CREATE TABLE inventory_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 0,
  reserved_quantity INT DEFAULT 0,
  reorder_point INT DEFAULT 5,
  reorder_quantity INT DEFAULT 10,
  last_counted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, location_id)
);

CREATE INDEX idx_inventory_product ON inventory_levels(product_id);
CREATE INDEX idx_inventory_location ON inventory_levels(location_id);

-- ============================================================
-- 7. INVENTORY MOVEMENTS (Audit trail)
-- ============================================================
CREATE TYPE movement_type AS ENUM (
  'sale', 'return', 'adjustment', 'transfer',
  'received', 'damaged', 'marketplace_sale', 'reserved'
);

CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id),
  type movement_type NOT NULL,
  quantity_change INT NOT NULL, -- positive = in, negative = out
  reference_id UUID, -- links to order, transfer, etc.
  reference_type TEXT, -- 'order', 'transfer', 'adjustment'
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_movements_product ON inventory_movements(product_id);
CREATE INDEX idx_movements_created ON inventory_movements(created_at);

-- ============================================================
-- 8. CUSTOMERS
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address JSONB,
  notes TEXT,
  total_spent DECIMAL(12,2) DEFAULT 0,
  visit_count INT DEFAULT 0,
  last_visit_at TIMESTAMPTZ,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. ORDERS / TRANSACTIONS (POS + Online)
-- ============================================================
CREATE TYPE order_status AS ENUM (
  'pending', 'completed', 'refunded', 'partially_refunded', 'cancelled'
);
CREATE TYPE order_channel AS ENUM (
  'pos', 'marketplace', 'shopify', 'ebay', 'website', 'manual'
);
CREATE TYPE payment_method AS ENUM (
  'card', 'cash', 'square', 'marketplace_checkout', 'other'
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id),
  customer_id UUID REFERENCES customers(id),
  order_number TEXT NOT NULL,
  channel order_channel NOT NULL DEFAULT 'pos',
  status order_status NOT NULL DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method payment_method,
  payment_reference TEXT, -- Square payment ID, etc.
  notes TEXT,
  metadata JSONB DEFAULT '{}', -- channel-specific data
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_orders_business ON orders(business_id);
CREATE INDEX idx_orders_channel ON orders(channel);
CREATE INDEX idx_orders_created ON orders(created_at);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. MARKETPLACE LISTINGS
-- ============================================================
CREATE TYPE listing_status AS ENUM (
  'draft', 'active', 'sold', 'expired', 'removed'
);
CREATE TYPE marketplace_platform AS ENUM (
  'facebook', 'ebay', 'shopify', 'offerup', 'craigslist'
);

CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  platform marketplace_platform NOT NULL,
  platform_listing_id TEXT, -- external ID from the platform
  status listing_status DEFAULT 'draft',
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  ai_generated_title TEXT,
  ai_generated_description TEXT,
  ai_suggested_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  listing_url TEXT,
  views INT DEFAULT 0,
  inquiries INT DEFAULT 0,
  pickup_location_id UUID REFERENCES locations(id),
  expires_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  sold_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_business ON marketplace_listings(business_id);
CREATE INDEX idx_listings_product ON marketplace_listings(product_id);
CREATE INDEX idx_listings_platform ON marketplace_listings(platform);
CREATE INDEX idx_listings_status ON marketplace_listings(status);

-- ============================================================
-- 11. AI INSIGHTS & DEMAND FORECASTING
-- ============================================================
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  insight_type TEXT NOT NULL, -- 'demand_forecast', 'price_suggestion', 'reorder_alert', 'trend'
  title TEXT NOT NULL,
  description TEXT,
  confidence DECIMAL(3,2), -- 0.00 to 1.00
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  is_actioned BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. MARKET PRICE TRACKING
-- ============================================================
CREATE TABLE market_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  platform marketplace_platform NOT NULL,
  search_query TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  title TEXT,
  listing_url TEXT,
  location TEXT,
  distance_miles DECIMAL(6,1),
  captured_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. ACTIVITY LOG
-- ============================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT, -- 'product', 'order', 'listing', etc.
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_business ON activity_log(business_id);
CREATE INDEX idx_activity_created ON activity_log(created_at);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Business member check function
CREATE OR REPLACE FUNCTION is_business_member(b_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM business_members
    WHERE business_id = b_id
    AND user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for businesses
CREATE POLICY "Users can view their businesses"
  ON businesses FOR SELECT
  USING (is_business_member(id));

CREATE POLICY "Owners can update their businesses"
  ON businesses FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Authenticated users can create businesses"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for products (via business membership)
CREATE POLICY "Members can view products"
  ON products FOR SELECT
  USING (is_business_member(business_id));

CREATE POLICY "Members can manage products"
  ON products FOR ALL
  USING (is_business_member(business_id));

-- RLS Policies for inventory_levels
CREATE POLICY "Members can view inventory"
  ON inventory_levels FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products p
    WHERE p.id = product_id
    AND is_business_member(p.business_id)
  ));

CREATE POLICY "Members can manage inventory"
  ON inventory_levels FOR ALL
  USING (EXISTS (
    SELECT 1 FROM products p
    WHERE p.id = product_id
    AND is_business_member(p.business_id)
  ));

-- RLS Policies for orders
CREATE POLICY "Members can view orders"
  ON orders FOR SELECT
  USING (is_business_member(business_id));

CREATE POLICY "Members can manage orders"
  ON orders FOR ALL
  USING (is_business_member(business_id));

-- RLS Policies for order_items
CREATE POLICY "Members can view order items"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders o
    WHERE o.id = order_id
    AND is_business_member(o.business_id)
  ));

CREATE POLICY "Members can manage order items"
  ON order_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM orders o
    WHERE o.id = order_id
    AND is_business_member(o.business_id)
  ));

-- RLS Policies for marketplace_listings
CREATE POLICY "Members can view listings"
  ON marketplace_listings FOR SELECT
  USING (is_business_member(business_id));

CREATE POLICY "Members can manage listings"
  ON marketplace_listings FOR ALL
  USING (is_business_member(business_id));

-- RLS for remaining tables (business_id based)
CREATE POLICY "Members can view locations"
  ON locations FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Members can manage locations"
  ON locations FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Members can view categories"
  ON categories FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Members can manage categories"
  ON categories FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Members can view customers"
  ON customers FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Members can manage customers"
  ON customers FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Members can view movements"
  ON inventory_movements FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products p WHERE p.id = product_id AND is_business_member(p.business_id)
  ));

CREATE POLICY "Members can manage movements"
  ON inventory_movements FOR ALL
  USING (EXISTS (
    SELECT 1 FROM products p WHERE p.id = product_id AND is_business_member(p.business_id)
  ));

CREATE POLICY "Members can view insights"
  ON ai_insights FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Members can manage insights"
  ON ai_insights FOR ALL USING (is_business_member(business_id));

CREATE POLICY "Members view market prices"
  ON market_prices FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products p WHERE p.id = product_id AND is_business_member(p.business_id)
  ));

CREATE POLICY "Members can view activity"
  ON activity_log FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Members can view business_members"
  ON business_members FOR SELECT USING (is_business_member(business_id));

CREATE POLICY "Owners can manage members"
  ON business_members FOR ALL
  USING (EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id = business_id
    AND b.owner_id = auth.uid()
  ));

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON inventory_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON marketplace_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  prefix TEXT;
  seq INT;
BEGIN
  prefix := TO_CHAR(NOW(), 'YYMMDD');
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 8) AS INT)), 0) + 1
  INTO seq
  FROM orders
  WHERE order_number LIKE prefix || '-%';
  NEW.order_number := prefix || '-' || LPAD(seq::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- Auto-create business membership on business creation
CREATE OR REPLACE FUNCTION auto_add_owner_membership()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO business_members (business_id, user_id, role, joined_at)
  VALUES (NEW.id, NEW.owner_id, 'owner', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_owner_on_business_create
  AFTER INSERT ON businesses
  FOR EACH ROW EXECUTE FUNCTION auto_add_owner_membership();
