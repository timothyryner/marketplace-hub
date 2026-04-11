'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  CreditCard,
  Banknote,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TAX_RATE = 0.08613; // Missouri 8.613%

interface CartItem {
  product: Product;
  quantity: number;
}

type PaymentMethod = 'card' | 'cash';

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [businessId, setBusinessId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setUserId(user.id);

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

    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('business_id', business.id)
      .eq('status', 'active')
      .order('name');

    if (data) setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!search) {
      setFiltered(products);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku?.toLowerCase().includes(q) ||
          p.barcode?.toLowerCase().includes(q)
      )
    );
  }, [products, search]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.retail_price * item.quantity,
    0
  );
  const taxAmount = subtotal * TAX_RATE;
  const total = subtotal + taxAmount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckingOut(true);

    const supabase = createClient();
    const orderNumber = `POS-${Date.now().toString().slice(-6)}`;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        business_id: businessId,
        order_number: orderNumber,
        channel: 'pos',
        status: 'completed',
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax_amount: parseFloat(taxAmount.toFixed(2)),
        discount_amount: 0,
        total: parseFloat(total.toFixed(2)),
        payment_method: paymentMethod,
        metadata: {},
        created_by: userId,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError || !order) {
      alert('Checkout failed: ' + (orderError?.message ?? 'Unknown error'));
      setCheckingOut(false);
      return;
    }

    // Insert order items
    const orderItems = cart.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      unit_price: item.product.retail_price,
      discount: 0,
      total: parseFloat((item.product.retail_price * item.quantity).toFixed(2)),
    }));

    await supabase.from('order_items').insert(orderItems);

    // Decrement inventory (best-effort, no location)
    for (const item of cart) {
      try {
        await supabase.rpc('decrement_inventory', {
          p_product_id: item.product.id,
          p_qty: item.quantity,
        });
      } catch {
        // RPC may not exist; silently fail
      }
    }

    setOrderSuccess(orderNumber);
    setCart([]);
    setCheckingOut(false);
  };

  if (orderSuccess) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Order Complete!</h2>
          <p className="text-slate-500 mb-1">Order <strong>{orderSuccess}</strong> has been processed.</p>
          <p className="text-2xl font-bold text-slate-900 mb-6">${total.toFixed(2)}</p>
          <Button
            variant="primary"
            onClick={() => {
              setOrderSuccess(null);
            }}
          >
            New Sale
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-7rem)]">
      {/* Left: Product grid */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-xl font-bold text-slate-900">Point of Sale</h1>
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search size={16} />}
            wrapperClassName="w-56"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-28 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-3">
              <Package size={48} strokeWidth={1.5} />
              <p className="text-sm">No active products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white border border-slate-200 rounded-xl p-4 text-left hover:border-blue-400 hover:shadow-sm hover:shadow-blue-100 transition-all group"
                >
                  <div className="w-full aspect-square bg-slate-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                    <Package size={28} className="text-slate-300 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2 mb-1">
                    {product.name}
                  </p>
                  {product.sku && (
                    <p className="text-xs text-slate-400 font-mono mb-1">{product.sku}</p>
                  )}
                  <p className="text-sm font-bold text-blue-600">
                    ${product.retail_price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Cart */}
      <div className="w-80 shrink-0 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Cart header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <ShoppingCart size={18} className="text-slate-500" />
          <h2 className="font-semibold text-slate-900 text-sm">
            Current Order
            {cart.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </h2>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-300 gap-2">
              <ShoppingCart size={32} strokeWidth={1.5} />
              <p className="text-xs">Tap a product to add it</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-2 bg-slate-50 rounded-xl p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 leading-tight line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ${item.product.retail_price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => updateQty(item.product.id, -1)}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-slate-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.product.id, 1)}
                    className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                  >
                    <Plus size={10} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="w-6 h-6 rounded-md text-slate-300 hover:text-red-500 flex items-center justify-center ml-0.5 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        <div className="border-t border-slate-100 px-4 py-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>Tax (8.613% MO)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="px-4 pb-3">
          <p className="text-xs font-medium text-slate-500 mb-2">Payment method</p>
          <div className="grid grid-cols-2 gap-2">
            {(['card', 'cash'] as PaymentMethod[]).map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  paymentMethod === method
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {method === 'card' ? <CreditCard size={14} /> : <Banknote size={14} />}
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Checkout button */}
        <div className="px-4 pb-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={cart.length === 0}
            loading={checkingOut}
            onClick={handleCheckout}
          >
            Charge ${total.toFixed(2)}
          </Button>
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="w-full text-xs text-slate-400 hover:text-slate-600 mt-2 py-1 transition-colors"
            >
              Clear cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
