'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  keyField?: keyof T;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends object>({
  columns,
  data,
  keyField,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no items to display.',
  emptyIcon,
  loading = false,
  className = '',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') {
        setSortKey(null);
        setSortDir(null);
      }
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [data, sortKey, sortDir]);

  const alignClass = (align?: string) => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col) => {
                const key = String(col.key);
                const isSorted = sortKey === key;
                return (
                  <th
                    key={key}
                    style={{ width: col.width }}
                    className={`px-4 py-3 font-medium text-slate-600 whitespace-nowrap ${alignClass(col.align)} ${col.sortable ? 'cursor-pointer select-none hover:bg-slate-100 transition-colors' : ''}`}
                    onClick={() => col.sortable && handleSort(key)}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted && sortDir === 'asc' ? (
                            <ChevronUp size={14} />
                          ) : isSorted && sortDir === 'desc' ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronsUpDown size={14} />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <div className="h-4 bg-slate-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                    {emptyIcon ?? <Inbox size={40} strokeWidth={1.5} />}
                    <div className="text-center">
                      <p className="font-medium text-slate-600">{emptyTitle}</p>
                      <p className="text-sm mt-0.5">{emptyDescription}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => {
                const rowKey = keyField
                  ? String((row as Record<string, unknown>)[String(keyField)])
                  : i;
                return (
                  <tr key={rowKey} className="hover:bg-slate-50 transition-colors">
                    {columns.map((col) => {
                      const key = String(col.key);
                      const value = (row as Record<string, unknown>)[key];
                      return (
                        <td
                          key={key}
                          className={`px-4 py-3 text-slate-700 ${alignClass(col.align)}`}
                        >
                          {col.render ? col.render(row) : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
