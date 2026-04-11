'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Insert business record
      if (data.user) {
        const slug = form.businessName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const { error: bizError } = await supabase.from('businesses').insert({
          owner_id: data.user.id,
          name: form.businessName,
          slug: `${slug}-${data.user.id.slice(0, 6)}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Chicago',
          currency: 'USD',
          settings: {},
        });

        if (bizError && bizError.code !== '23505') {
          // Non-duplicate error — surface it but don't block signup
          console.warn('Business insert error:', bizError.message);
        }
      }

      setSuccess(true);
      // If email confirmation is disabled, go to dashboard
      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success && !loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Check your email</h2>
          <p className="text-slate-500 text-sm mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
            </svg>
          </div>
          <span className="font-semibold text-white text-lg">MarketplaceHub</span>
        </Link>
        <div className="space-y-6">
          {[
            { icon: '📦', text: 'Manage inventory across multiple locations' },
            { icon: '🛒', text: 'Run a fast, intuitive point-of-sale' },
            { icon: '🏪', text: 'List on Facebook, eBay & Shopify automatically' },
            { icon: '📊', text: 'Understand your business with real-time analytics' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-slate-300 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-sm">Free during beta. No credit card required.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">MarketplaceHub</span>
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">Start managing your business for free</p>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your name"
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              icon={<User size={16} />}
              required
              autoComplete="name"
            />
            <Input
              label="Business name"
              type="text"
              placeholder="My Awesome Store"
              value={form.businessName}
              onChange={(e) => update('businessName', e.target.value)}
              icon={<Building2 size={16} />}
              required
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              icon={<Mail size={16} />}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              icon={<Lock size={16} />}
              required
              autoComplete="new-password"
              hint="Minimum 8 characters"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Create account
            </Button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
