'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Package,
  RefreshCw,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Product, ProductStatus, ConditionType } from '@/types/database';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { StatusBadge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ProductForm {
  name: string;
  sku: string;
  barcode: string;
  description: string;
  retail_price: string;
  cost_price: string;
  condition: ConditionType;
  status: ProductStatus;
}

const defaultForm: ProductForm = {
  name: '',
  sku: '',
  barcode: '',
  description: '',
  retail_price: '',
  cost_price: '',
  condition: 'good',
  status: 'active',
};

interface ProductWithQty extends Product {
  qty: number;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<ProductWithQty[]>([]);
  const [filtered, setFiltered] = useState<ProductWithQty[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: business } = await supabase
      .from('businesses')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (!business) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('products')
      .select('*, inventory_levels(quantity)')
      .eq('business_id', business.id)
      .order('created_at', { ascending: false });

    if (data) {
      const withQty = data.map((p) => ({
        ...p,
        qty:
          (p.inventory_levels as { quantity: number }[] | null)?.reduce(
            (sum: number, il: { quantity: number }) => sum + il.quantity,
            0
          ) ?? 0,
      }));
      setProducts(withQty);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let list = products;
    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.barcode?.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [products, search, statusFilter]);

  const updateForm = (field: keyof ProductForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!form.retail_price || isNaN(parseFloat(form.retail_price))) {
      setFormError('A valid retail price is required.');
      return;
    }
    setFormError('');
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }

    const { data: business } = await supabase
      .from('businesses')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (!business) {
      setFormError('No business found for your account.');
      setSaving(false);
      return;
    }

    const { error } = await supabase.from('products').insert({
      business_id: business.id,
      name: form.name.trim(),
      sku: form.sku.trim() || null,
      barcode: form.barcode.trim() || null,
      description: form.description.trim() || null,
      retail_price: parseFloat(form.retail_price),
      cost_price: form.cost_price ? parseFloat(form.cost_price) : null,
      condition: form.condition,
      status: form.status,
      images: [],
      tags: [],
      is_taxable: true,
    });

    if (error) {
      setFormError(error.message);
    } else {
      setModalOpen(false);
      setForm(defaultForm);
      fetchProducts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeletingId(id);
    const supabase = createClient();
    await supabase.from('products').delete().eq('id', id);
    setDeletingId(null);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <Header
        title="Inventory"
        subtitle={`${products.length} products`}
        actions={
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => {
              setForm(defaultForm);
              setFormError('');
              setModalOpen(true);
            }}
          >
            Add Product
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <Input
          placeholder="Search products, SKU, barcode…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={16} />}
          wrapperClassName="flex-1"
        />
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400 shrink-0" />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            wrapperClassName="min-w-32"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
        <Button variant="outline" icon={<RefreshCw size={15} />} onClick={fetchProducts} loading={loading}>
          Refresh
        </Button>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-500 w-10">#</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">SKU</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Price</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Condition</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                      <Package size={48} strokeWidth={1.5} />
                      <div className="text-center">
                        <p className="font-medium text-slate-600 text-base">No products found</p>
                        <p className="text-sm mt-1">
                          {search || statusFilter !== 'all'
                            ? 'Try adjusting your search or filters.'
                            : 'Add your first product to get started.'}
                        </p>
                      </div>
                      {!search && statusFilter === 'all' && (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<Plus size={14} />}
                          onClick={() => {
                            setForm(defaultForm);
                            setFormError('');
                            setModalOpen(true);
                          }}
                        >
                          Add Product
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((product, i) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Package size={16} className="text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-slate-400 truncate max-w-48">{product.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">
                      {product.sku || '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      ${product.retail_price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-semibold text-sm ${
                          product.qty === 0
                            ? 'text-red-600'
                            : product.qty <= 3
                            ? 'text-amber-600'
                            : 'text-slate-900'
                        }`}
                      >
                        {product.qty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.condition} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Product Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Product"
        description="Fill in the product details below."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              Save Product
            </Button>
          </>
        }
      >
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {formError}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            placeholder="e.g. Vintage Table Lamp"
            value={form.name}
            onChange={(e) => updateForm('name', e.target.value)}
            required
            wrapperClassName="sm:col-span-2"
          />
          <Input
            label="SKU"
            placeholder="e.g. VTL-001"
            value={form.sku}
            onChange={(e) => updateForm('sku', e.target.value)}
          />
          <Input
            label="Barcode"
            placeholder="e.g. 012345678901"
            value={form.barcode}
            onChange={(e) => updateForm('barcode', e.target.value)}
          />
          <Input
            label="Retail Price"
            type="number"
            placeholder="0.00"
            value={form.retail_price}
            onChange={(e) => updateForm('retail_price', e.target.value)}
            required
          />
          <Input
            label="Cost Price"
            type="number"
            placeholder="0.00"
            value={form.cost_price}
            onChange={(e) => updateForm('cost_price', e.target.value)}
          />
          <Select
            label="Condition"
            value={form.condition}
            onChange={(e) => updateForm('condition', e.target.value)}
          >
            <option value="new">New</option>
            <option value="like_new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="refurbished">Refurbished</option>
          </Select>
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => updateForm('status', e.target.value)}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </Select>
          <Textarea
            label="Description"
            placeholder="Brief product description…"
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            rows={3}
            wrapperClassName="sm:col-span-2"
          />
        </div>
      </Modal>
    </div>
  );
}
