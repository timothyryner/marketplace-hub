'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Inventory', href: '/inventory', icon: Package },
  { label: 'POS', href: '/pos', icon: ShoppingCart },
  { label: 'Marketplace', href: '/marketplace', icon: Store },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  businessName?: string;
  userEmail?: string;
}

export function Sidebar({
  businessName = 'MarketplaceHub',
  userEmail = '',
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const initials = userEmail
    ? userEmail.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <aside
      className={`flex flex-col h-full bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'} shrink-0`}
    >
      {/* Brand */}
      <div
        className={`flex items-center gap-3 px-4 py-5 border-b border-slate-800 ${collapsed ? 'justify-center' : ''}`}
      >
        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="MarketplaceHub logo">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
          </svg>
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm text-white truncate">
            {businessName}
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
                ${active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user + logout */}
      <div className="border-t border-slate-800 px-2 py-3 space-y-0.5">
        {/* User info */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
              {userEmail ? (
                <span className="text-xs font-semibold text-slate-300">
                  {initials}
                </span>
              ) : (
                <User size={14} className="text-slate-400" />
              )}
            </div>
            <span className="text-xs text-slate-400 truncate flex-1">
              {userEmail || 'User'}
            </span>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title="Logout"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((v) => !v)}
          title={collapsed ? 'Expand' : 'Collapse'}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-slate-800 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? (
            <ChevronRight size={16} className="shrink-0" />
          ) : (
            <>
              <ChevronLeft size={16} className="shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
