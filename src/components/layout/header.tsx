import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, breadcrumbs, actions }: HeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-slate-400 mb-1">
            {breadcrumbs.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={14} className="shrink-0" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-600">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0 mt-1">{actions}</div>
      )}
    </div>
  );
}
