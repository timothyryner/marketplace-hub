import React from 'react';
import { Package, Store, DollarSign, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '@/components/ui/card';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconColor: string;
}

function StatCard({ title, value, change, changeType = 'neutral', icon, iconColor }: StatCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            {change && (
              <p
                className={`text-xs mt-1.5 font-medium ${
                  changeType === 'up'
                    ? 'text-emerald-600'
                    : changeType === 'down'
                    ? 'text-red-600'
                    : 'text-slate-500'
                }`}
              >
                {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
              </p>
            )}
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const recentOrders = [
  { id: 'ORD-0041', customer: 'Walk-in Customer', channel: 'pos', total: 34.99, status: 'completed', date: '2 min ago' },
  { id: 'ORD-0040', customer: 'John D.', channel: 'marketplace', total: 75.00, status: 'pending', date: '18 min ago' },
  { id: 'ORD-0039', customer: 'Walk-in Customer', channel: 'pos', total: 12.50, status: 'completed', date: '1 hr ago' },
  { id: 'ORD-0038', customer: 'Sarah M.', channel: 'ebay', total: 189.00, status: 'completed', date: '3 hrs ago' },
  { id: 'ORD-0037', customer: 'Walk-in Customer', channel: 'pos', total: 55.00, status: 'refunded', date: 'Yesterday' },
];

const channelColors: Record<string, string> = {
  pos: 'bg-blue-100 text-blue-700',
  marketplace: 'bg-emerald-100 text-emerald-700',
  ebay: 'bg-amber-100 text-amber-700',
  shopify: 'bg-indigo-100 text-indigo-700',
  manual: 'bg-slate-100 text-slate-600',
};

const barData = [
  { day: 'Mon', value: 320 },
  { day: 'Tue', value: 450 },
  { day: 'Wed', value: 380 },
  { day: 'Thu', value: 590 },
  { day: 'Fri', value: 720 },
  { day: 'Sat', value: 870 },
  { day: 'Sun', value: 440 },
];

const maxBar = Math.max(...barData.map((d) => d.value));

export default function DashboardPage() {
  return (
    <div>
      <Header
        title="Dashboard"
        subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Products"
          value="284"
          change="12 added this week"
          changeType="up"
          icon={<Package size={20} />}
          iconColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Active Listings"
          value="47"
          change="3 new this week"
          changeType="up"
          icon={<Store size={20} />}
          iconColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Today&apos;s Sales"
          value="$439.50"
          change="vs $312 yesterday"
          changeType="up"
          icon={<DollarSign size={20} />}
          iconColor="bg-violet-50 text-violet-600"
        />
        <StatCard
          title="Low Stock Alerts"
          value="9"
          change="Needs attention"
          changeType="down"
          icon={<AlertTriangle size={20} />}
          iconColor="bg-amber-50 text-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Revenue This Week"
            subtitle="Daily sales across all channels"
            action={
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                +18.4%
              </span>
            }
          />
          <CardBody>
            <div className="flex items-end gap-2 h-36">
              {barData.map((d) => {
                const height = Math.round((d.value / maxBar) * 100);
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full bg-blue-600 rounded-t-md transition-all group-hover:bg-blue-700 relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        ${d.value}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-xs text-slate-500">Total this week</p>
                <p className="text-lg font-bold text-slate-900">$3,770</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg. per day</p>
                <p className="text-lg font-bold text-slate-900">$538.57</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Best day</p>
                <p className="text-lg font-bold text-slate-900">Saturday</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quick stats sidebar */}
        <Card>
          <CardHeader title="Sales by Channel" />
          <CardBody>
            <div className="space-y-4">
              {[
                { channel: 'Point of Sale', amount: '$1,840', pct: 49, color: 'bg-blue-500' },
                { channel: 'Facebook Marketplace', amount: '$1,120', pct: 30, color: 'bg-emerald-500' },
                { channel: 'eBay', amount: '$560', pct: 15, color: 'bg-amber-500' },
                { channel: 'Manual', amount: '$250', pct: 6, color: 'bg-slate-400' },
              ].map((item) => (
                <div key={item.channel}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-700 font-medium">{item.channel}</span>
                    <span className="text-slate-900 font-semibold">{item.amount}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Recent Orders */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Recent Orders"
            action={
              <a href="/pos" className="text-xs text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                View all <ArrowUpRight size={12} />
              </a>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-left font-medium text-slate-500">Order</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-500">Channel</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-500">Customer</th>
                  <th className="px-5 py-3 text-right font-medium text-slate-500">Total</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-500">Status</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-500">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-900">{order.id}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${channelColors[order.channel] ?? 'bg-slate-100 text-slate-600'}`}>
                        {order.channel}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{order.customer}</td>
                    <td className="px-5 py-3 text-right font-semibold text-slate-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Low stock */}
        <Card>
          <CardHeader
            title="Low Stock Items"
            action={
              <Badge variant="warning" size="sm">9 items</Badge>
            }
          />
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Vintage Lamp', sku: 'VL-001', qty: 1 },
                { name: 'Wooden Chair', sku: 'WC-042', qty: 2 },
                { name: 'Ceramic Vase Set', sku: 'CV-018', qty: 2 },
                { name: 'Brass Bookends', sku: 'BB-007', qty: 3 },
                { name: 'Leather Journal', sku: 'LJ-031', qty: 3 },
              ].map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.sku}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      item.qty <= 1
                        ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {item.qty} left
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
