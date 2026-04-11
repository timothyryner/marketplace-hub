# MarketplaceHub

**Unified inventory, POS, and marketplace management for small businesses.**

Built to address the critical gap identified in 2026 Facebook Marketplace research: no affordable, integrated tool exists that unifies marketplace listing management, real-time inventory tracking, POS transaction logging, and AI-powered demand insights for small businesses operating across Facebook Marketplace and physical storefronts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend/DB | Supabase (PostgreSQL + Auth + Realtime) |
| Hosting | Vercel |
| Payments | Square API |
| Maps | Google Maps Platform |
| AI | OpenAI API (listing generation, demand forecasting) |
| Icons | Lucide React |

## Features

### Core
- **Inventory Management** — Multi-location stock tracking, barcode scanning, low-stock alerts, movement audit trail
- **Point of Sale** — In-app POS with cart management, Missouri tax calculation (8.613%), payment processing via Square
- **Marketplace Listings** — Create and manage listings across Facebook Marketplace, eBay, Shopify, OfferUp
- **AI Intelligence** — AI-generated listing titles/descriptions, demand forecasting, price optimization
- **Analytics** — Revenue tracking, sales by channel, inventory health metrics, top products

### Architecture
- Multi-tenant with Row Level Security (RLS)
- Role-based access control (owner, manager, staff)
- Real-time inventory updates via Supabase subscriptions
- Offline-capable PWA architecture
- API-first design for future hardware integrations

## Project Structure

```
marketplace-hub/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx         # Email/password login
│   │   │   └── signup/page.tsx        # Registration + business creation
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx             # Dashboard shell with sidebar
│   │   │   ├── dashboard/page.tsx     # Overview with stats & charts
│   │   │   ├── inventory/page.tsx     # Product & stock management
│   │   │   ├── pos/page.tsx           # Point of Sale terminal
│   │   │   ├── marketplace/page.tsx   # Listing management
│   │   │   ├── analytics/page.tsx     # Business analytics
│   │   │   └── settings/page.tsx      # Business settings
│   │   ├── api/
│   │   │   ├── inventory/route.ts     # CRUD for products
│   │   │   ├── pos/route.ts           # Order creation & retrieval
│   │   │   ├── listings/route.ts      # Marketplace listing CRUD
│   │   │   └── ai/route.ts            # AI listing generation
│   │   ├── layout.tsx                 # Root layout
│   │   └── page.tsx                   # Landing page
│   ├── components/
│   │   ├── ui/                        # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── modal.tsx
│   │   │   └── data-table.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx            # Navigation sidebar
│   │   │   ├── header.tsx             # Page header
│   │   │   └── dashboard-layout.tsx   # Dashboard wrapper
│   │   ├── inventory/
│   │   ├── pos/
│   │   ├── marketplace/
│   │   └── analytics/
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts              # Browser Supabase client
│   │       ├── server.ts              # Server Supabase client
│   │       └── middleware.ts          # Auth middleware
│   ├── hooks/
│   │   ├── useAuth.ts                 # Authentication hook
│   │   └── useBusiness.ts             # Business context hook
│   ├── types/
│   │   └── database.ts                # TypeScript type definitions
│   └── middleware.ts                  # Next.js middleware (auth guard)
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql     # Complete database schema
├── docs/
│   └── research-report.md            # Full research report
├── .env.local.example                 # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Database Schema

### Entity Relationship Overview

```
businesses (multi-tenant root)
  ├── business_members (RBAC)
  ├── locations (multi-location)
  ├── categories
  ├── products
  │   ├── inventory_levels (per-location stock)
  │   ├── inventory_movements (audit trail)
  │   └── marketplace_listings (cross-platform)
  ├── customers
  ├── orders
  │   └── order_items
  ├── ai_insights
  ├── market_prices
  └── activity_log
```

### Key Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `businesses` | Multi-tenant root | name, slug, owner_id, settings |
| `products` | Inventory items | sku, barcode, retail_price, condition, status |
| `inventory_levels` | Per-location stock | product_id, location_id, quantity, reorder_point |
| `inventory_movements` | Audit trail | type (sale/return/adjustment), quantity_change |
| `orders` | POS + online transactions | channel, status, total, payment_method |
| `marketplace_listings` | Cross-platform listings | platform, status, ai_generated fields |
| `ai_insights` | AI recommendations | insight_type, confidence, data |

Row Level Security (RLS) is enabled on all tables with business membership checks.

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Vercel account (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/timothyryner/marketplace-hub.git
cd marketplace-hub
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:
   ```
   supabase/migrations/001_initial_schema.sql
   ```
3. Go to **Settings > API** and copy your project URL and anon key
4. Enable **Email/Password** auth in **Authentication > Providers**

### 3. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Optional API keys (for full functionality):
```
SQUARE_ACCESS_TOKEN=your-square-token
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
OPENAI_API_KEY=your-openai-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

Set environment variables in Vercel dashboard under **Settings > Environment Variables**.

## API Integrations

### Supabase (Core — Required)
- Database: PostgreSQL with RLS
- Authentication: Email/password + OAuth
- Realtime: Live inventory subscriptions
- Storage: Product image uploads

### Square (Payment Processing)
- In-person payment processing
- Transaction logging
- Receipt generation
- [Square Developer Docs](https://developer.squareup.com/docs)

### Google Maps Platform (Location Services)
- Store location mapping
- Service area definition
- Local pricing analysis
- [Google Maps Platform](https://developers.google.com/maps)

### OpenAI (AI Features)
- Listing title/description generation
- Demand forecasting
- Price optimization suggestions
- [OpenAI API Docs](https://platform.openai.com/docs)

### Facebook Graph API (Marketplace — Future)
- Marketplace listing creation/management
- Order sync
- Buyer messaging
- [Facebook Commerce API](https://developers.facebook.com/docs/commerce-platform)

## Research Context

This prototype was built based on comprehensive research into:
- **2026 Facebook Marketplace trends** for small business tools in Missouri
- **Inventory management** and **POS system** market analysis
- **Patent white space** in AI-integrated smart devices and energy-efficient gadgets
- **Missouri small business ecosystem** (590,131 businesses, $2.6B used equipment market)

Key market gaps addressed:
1. Fragmented omnichannel inventory (no affordable multi-channel sync)
2. No marketplace-to-POS bridge for Facebook Marketplace sellers
3. AI demand forecasting absent at SMB price points
4. Used hardware verification void on secondary markets

See `docs/research-report.md` for the full research report.

## License

MIT
