import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for analytics display
const monthlyRevenue = [
  { month: 'Oct', revenue: 2840, orders: 38 },
  { month: 'Nov', revenue: 3120, orders: 44 },
  { month: 'Dec', revenue: 4850, orders: 68 },
  { month: 'Jan', revenue: 3210, orders: 45 },
  { month: 'Feb', revenue: 3780, orders: 52 },
  { month: 'Mar', revenue: 4240, orders: 59 },
];

const topProducts = [
  { name: 'Vintage Table Lamp', sold: 12, revenue: 719.88, channel: 'marketplace' },
  { name: 'Ceramic Serving Set', sold: 9, revenue: 539.91, channel: 'pos' },
  { name: 'Brass Desk Organizer', sold: 8, revenue: 319.92, channel: 'ebay' },
  { name: 'Wicker Storage Basket', sold: 7, revenue: 209.93, channel: 'pos' },
  { name: 'Wooden Bookshelf', sold: 5, revenue: 749.95, channel: 'marketplace' },
];

const channels = [
  { name: 'Point of Sale', revenue: 8340, orders: 126, pct: 44, trend: 'up', trendPct: '12.4%' },
  { name: 'Facebook Marketplace', revenue: 5610, orders: 48, pct: 30, trend: 'up', trendPct: '8.2%' },
  { name: 'eBay', revenue: 2980, orders: 22, pct: 16, trend: 'down', trendPct: '3.1%' },
  { name: 'Shopify', revenue: 1120, orders: 14, pct: 6, trend: 'up', trendPct: '22.0%' },
  { name: 'Manual', revenue: 720, orders: 8, pct: 4, trend: 'neutral', trendPct: '0.0%' },
];

const inventoryHealth = {
  totalProducts: 284,
  activeProducts: 241,
  draftProducts: 31,
  archivedProducts: 12,
  outOfStock: 14,
  lowStock: 9,
  wellStocked: 261,
  totalValue: 48320,
};

const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.revenue));

export default function AnalyticsPage() {
  return (
    <div>
      <Header
        title="Analytics"
        subtitle="Business performance overview"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Total Revenue (6mo)',
            value: '$22,040',
            change: '+18.4% vs prior period',
            up: true,
            icon: <DollarSign size={20} />,
            color: 'bg-blue-50 text-blue-600',
          },
          {
            label: 'Total Orders (6mo)',
            value: '306',
            change: '+22 orders vs prior period',
            up: true,
            icon: <ShoppingBag size={20} />,
            color: 'bg-emerald-50 text-emerald-600',
          },
          {
            label: 'Avg. Order Value',
            value: '$72.03',
            change: '-2.1% vs prior period',
            up: false,
            icon: <TrendingUp size={20} />,
            color: 'bg-violet-50 text-violet-600',
          },
          {
            label: 'Unique Customers',
            value: '184',
            change: '+31 new this month',
            up: true,
            icon: <Users size={20} />,
            color: 'bg-amber-50 text-amber-600',
          },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardBody>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
                  <p
                    className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${
                      kpi.up ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {kpi.change}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}
                >
                  {kpi.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader title="Monthly Revenue" subtitle="Last 6 months" />
          <CardBody>
            <div className="flex items-end gap-3 h-44 mb-4">
              {monthlyRevenue.map((d) => {
                const h = Math.round((d.revenue / maxRevenue) * 100);
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <div className="w-full relative flex flex-col justify-end" style={{ height: '160px' }}>
                      <div
                        className="w-full bg-blue-600 rounded-t-lg group-hover:bg-blue-700 transition-colors"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          ${d.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{d.month}</span>
                    <span className="text-xs text-slate-400">{d.orders} orders</span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Best Month</p>
                <p className="font-bold text-slate-900">December</p>
                <p className="text-xs text-slate-400">$4,850</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg. Monthly</p>
                <p className="font-bold text-slate-900">$3,673</p>
                <p className="text-xs text-slate-400">over 6 months</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">YTD Revenue</p>
                <p className="font-bold text-slate-900">$22,040</p>
                <p className="text-xs text-emerald-600">+18.4% YoY</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Sales by channel */}
        <Card>
          <CardHeader title="Sales by Channel" />
          <CardBody>
            <div className="space-y-5">
              {channels.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{c.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        ${c.revenue.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-medium flex items-center gap-0.5 ${
                          c.trend === 'up'
                            ? 'text-emerald-600'
                            : c.trend === 'down'
                            ? 'text-red-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {c.trend === 'up' ? (
                          <TrendingUp size={11} />
                        ) : c.trend === 'down' ? (
                          <TrendingDown size={11} />
                        ) : null}
                        {c.trendPct}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{c.orders} orders · {c.pct}% of revenue</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top Products */}
        <Card>
          <CardHeader title="Top Selling Products" subtitle="By revenue, last 6 months" />
          <CardBody padded={false}>
            <div className="divide-y divide-slate-50">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-4 px-6 py-3.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{p.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{p.sold} sold</span>
                      <span
                        className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${
                          p.channel === 'marketplace'
                            ? 'bg-blue-50 text-blue-600'
                            : p.channel === 'pos'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {p.channel}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900 shrink-0">
                    ${p.revenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Inventory Health */}
        <Card>
          <CardHeader
            title="Inventory Health"
            subtitle="Current stock status"
          />
          <CardBody>
            {/* Summary numbers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                {
                  label: 'Total Products',
                  value: inventoryHealth.totalProducts,
                  icon: <Package size={16} />,
                  color: 'text-blue-600 bg-blue-50',
                },
                {
                  label: 'Inventory Value',
                  value: `$${inventoryHealth.totalValue.toLocaleString()}`,
                  icon: <DollarSign size={16} />,
                  color: 'text-emerald-600 bg-emerald-50',
                },
                {
                  label: 'Low Stock',
                  value: inventoryHealth.lowStock,
                  icon: <AlertTriangle size={16} />,
                  color: 'text-amber-600 bg-amber-50',
                },
                {
                  label: 'Out of Stock',
                  value: inventoryHealth.outOfStock,
                  icon: <XCircle size={16} />,
                  color: 'text-red-600 bg-red-50',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-slate-50 rounded-xl p-3"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-lg font-bold text-slate-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stock breakdown */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-3">Stock Distribution</p>
              <div className="space-y-3">
                {[
                  {
                    label: 'Well Stocked',
                    count: inventoryHealth.wellStocked,
                    pct: Math.round(
                      (inventoryHealth.wellStocked / inventoryHealth.totalProducts) * 100
                    ),
                    color: 'bg-emerald-500',
                    badge: <Badge variant="success" size="sm">Good</Badge>,
                  },
                  {
                    label: 'Low Stock',
                    count: inventoryHealth.lowStock,
                    pct: Math.round(
                      (inventoryHealth.lowStock / inventoryHealth.totalProducts) * 100
                    ),
                    color: 'bg-amber-400',
                    badge: <Badge variant="warning" size="sm">Warning</Badge>,
                  },
                  {
                    label: 'Out of Stock',
                    count: inventoryHealth.outOfStock,
                    pct: Math.round(
                      (inventoryHealth.outOfStock / inventoryHealth.totalProducts) * 100
                    ),
                    color: 'bg-red-500',
                    badge: <Badge variant="danger" size="sm">Critical</Badge>,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="flex items-center gap-2 text-slate-700">
                        {item.label}
                        {item.badge}
                      </span>
                      <span className="font-medium text-slate-900">
                        {item.count} items
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
