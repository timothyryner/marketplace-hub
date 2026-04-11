'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Eye,
  Trash2,
  Sparkles,
  Store,
  ExternalLink,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type {
  MarketplaceListing,
  Product,
  MarketplacePlatform,
  ListingStatus,
} from '@/types/database';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { StatusBadge, Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ListingWithProduct extends MarketplaceListing {
  product?: Product;
}

interface ListingForm {
  product_id: string;
  platform: MarketplacePlatform;
  title: string;
  description: string;
  price: string;
  status: ListingStatus;
}

const defaultForm: ListingForm = {
  product_id: '',
  platform: 'facebook',
  title: '',
  description: '',
  price: '',
  status: 'draft',
};

const platformIcons: Record<MarketplacePlatform, { label: string; color: string; bg: string }> = {
  facebook: { label: 'Facebook', color: 'text-blue-700', bg: 'bg-blue-100' },
  ebay: { label: 'eBay', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  shopify: { label: 'Shopify', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  offerup: { label: 'OfferUp', color: 'text-teal-700', bg: 'bg-teal-100' },
  craigslist: { label: 'Craigslist', color: 'text-purple-700', bg: 'bg-purple-100' },
};

const aiSamples: Record<MarketplacePlatform, { title: string; description: string; price: string }> = {
  facebook: {
    title: 'Beautiful Vintage Item — Great Condition!',
    description:
      "Selling this wonderful piece from my collection. It's in great condition with minimal wear. Perfect for home décor or as a unique gift. Local pickup preferred — happy to meet in a safe location. Message me with any questions!",
    price: '45.00',
  },
  ebay: {
    title: 'Vintage Item — Excellent Condition — Fast Shipping',
    description:
      'You are bidding on a genuine vintage item in excellent condition. Carefully stored and well-maintained. Ships within 1 business day via USPS Priority Mail with full tracking. Returns accepted within 30 days. Check my other listings for more great items!',
    price: '59.99',
  },
  shopify: {
    title: 'Curated Vintage Collection Item',
    description:
      'Add a touch of history to your space with this carefully curated vintage piece. Each item in our collection is hand-selected for quality and character. Makes a wonderful conversation starter or gift. Free shipping on orders over $50!',
    price: '79.00',
  },
  offerup: {
    title: 'Vintage Item — Pick Up Today!',
    description:
      'Great vintage item, works perfectly. Selling because I need the space. Cash or Venmo. Can meet nearby.',
    price: '35.00',
  },
  craigslist: {
    title: 'Vintage Item for Sale — $35 OBO',
    description:
      'Selling a nice vintage item, good condition. $35 or best offer. Call or text to arrange pickup. No holds.',
    price: '35.00',
  },
};

export default function MarketplacePage() {
  const [listings, setListings] = useState<ListingWithProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<ListingForm>(defaultForm);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [businessId, setBusinessId] = useState<string>('');

  const fetchData = useCallback(async () => {
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
    setBusinessId(business.id);

    const [listingsRes, productsRes] = await Promise.all([
      supabase
        .from('marketplace_listings')
        .select('*, product:products(*)')
        .eq('business_id', business.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('products')
        .select('id, name, retail_price, sku')
        .eq('business_id', business.id)
        .eq('status', 'active')
        .order('name'),
    ]);

    if (listingsRes.data) setListings(listingsRes.data);
    if (productsRes.data) setProducts(productsRes.data as unknown as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateForm = (field: keyof ListingForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const applyAI = () => {
    const sample = aiSamples[form.platform];
    setForm((prev) => ({
      ...prev,
      title: sample.title,
      description: sample.description,
      price: form.price || sample.price,
    }));
  };

  const handleSave = async () => {
    if (!form.product_id) {
      setFormError('Please select a product.');
      return;
    }
    if (!form.title.trim()) {
      setFormError('Listing title is required.');
      return;
    }
    if (!form.price || isNaN(parseFloat(form.price))) {
      setFormError('A valid price is required.');
      return;
    }
    setFormError('');
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase.from('marketplace_listings').insert({
      business_id: businessId,
      product_id: form.product_id,
      platform: form.platform,
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: parseFloat(form.price),
      status: form.status,
      images: [],
      views: 0,
      inquiries: 0,
    });

    if (error) {
      setFormError(error.message);
    } else {
      setModalOpen(false);
      setForm(defaultForm);
      fetchData();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this listing?')) return;
    const supabase = createClient();
    await supabase.from('marketplace_listings').delete().eq('id', id);
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = listings.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.platform.toLowerCase().includes(q) ||
      l.product?.name?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <Header
        title="Marketplace Listings"
        subtitle={`${listings.length} total listings`}
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
            Create Listing
          </Button>
        }
      />

      {/* Search */}
      <div className="mb-5">
        <Input
          placeholder="Search listings by title, product, or platform…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={16} />}
          wrapperClassName="max-w-md"
        />
      </div>

      {/* Listings table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-500">Platform</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Title</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Price</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Views</th>
                <th className="px-4 py-3 text-right font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-slate-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                      <Store size={48} strokeWidth={1.5} />
                      <div className="text-center">
                        <p className="font-medium text-slate-600 text-base">No listings yet</p>
                        <p className="text-sm mt-1">Create your first marketplace listing to start selling.</p>
                      </div>
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
                        Create Listing
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((listing) => {
                  const pi = platformIcons[listing.platform];
                  return (
                    <tr key={listing.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${pi.bg} ${pi.color}`}
                        >
                          {pi.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-48">
                        <p className="font-medium text-slate-900 truncate">{listing.title}</p>
                        {listing.description && (
                          <p className="text-xs text-slate-400 truncate mt-0.5">{listing.description}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {listing.product?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">
                        ${listing.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={listing.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="flex items-center justify-end gap-1 text-slate-500 text-xs">
                          <Eye size={12} />
                          {listing.views}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {listing.listing_url && (
                            <a
                              href={listing.listing_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                          <button
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => handleDelete(listing.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Listing Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Marketplace Listing"
        description="Choose a product and platform, then set your listing details."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" loading={saving} onClick={handleSave}>
              Create Listing
            </Button>
          </>
        }
      >
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {formError}
          </div>
        )}
        <div className="space-y-4">
          <Select
            label="Product"
            value={form.product_id}
            onChange={(e) => {
              const pid = e.target.value;
              const product = products.find((p) => p.id === pid);
              setForm((prev) => ({
                ...prev,
                product_id: pid,
                price: product ? String(product.retail_price) : prev.price,
                title: product ? product.name : prev.title,
              }));
            }}
            required
          >
            <option value="">Select a product…</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.sku ? `(${p.sku})` : ''} — ${p.retail_price}
              </option>
            ))}
          </Select>

          <Select
            label="Platform"
            value={form.platform}
            onChange={(e) => updateForm('platform', e.target.value)}
          >
            <option value="facebook">Facebook Marketplace</option>
            <option value="ebay">eBay</option>
            <option value="shopify">Shopify</option>
            <option value="offerup">OfferUp</option>
            <option value="craigslist">Craigslist</option>
          </Select>

          <div className="flex items-end gap-2">
            <Input
              label="Listing Title"
              placeholder="What buyers will see…"
              value={form.title}
              onChange={(e) => updateForm('title', e.target.value)}
              required
              wrapperClassName="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              icon={<Sparkles size={14} />}
              onClick={applyAI}
              className="mb-0.5 whitespace-nowrap"
              title="AI generate listing content"
            >
              AI Generate
            </Button>
          </div>

          <Textarea
            label="Description"
            placeholder="Describe the item for buyers…"
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => updateForm('price', e.target.value)}
              required
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => updateForm('status', e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </Select>
          </div>

          {/* AI notice */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5">
            <Sparkles size={14} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Click <strong>AI Generate</strong> to auto-fill the title and description with platform-optimized copy based on your selected platform.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
