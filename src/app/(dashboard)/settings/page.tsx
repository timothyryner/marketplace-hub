'use client';

import React, { useEffect, useState } from 'react';
import { Save, Building2, CheckCircle2, AlertCircle, User, Bell, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Business } from '@/types/database';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
  'America/Anchorage',
  'Pacific/Honolulu',
  'UTC',
];

interface BusinessForm {
  name: string;
  email: string;
  phone: string;
  address_line1: string;
  city: string;
  state: string;
  zip: string;
  timezone: string;
  description: string;
}

export default function SettingsPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [form, setForm] = useState<BusinessForm>({
    name: '',
    email: '',
    phone: '',
    address_line1: '',
    city: '',
    state: '',
    zip: '',
    timezone: 'America/Chicago',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'business' | 'notifications' | 'security'>('business');

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (data) {
        setBusiness(data);
        setForm({
          name: data.name ?? '',
          email: data.email ?? '',
          phone: data.phone ?? '',
          address_line1: data.address_line1 ?? '',
          city: data.city ?? '',
          state: data.state ?? '',
          zip: data.zip ?? '',
          timezone: data.timezone ?? 'America/Chicago',
          description: data.description ?? '',
        });
      }
      setLoading(false);
    };
    fetchBusiness();
  }, []);

  const updateForm = (field: keyof BusinessForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Business name is required.');
      return;
    }
    setError('');
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !business) {
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from('businesses')
      .update({
        name: form.name.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        address_line1: form.address_line1.trim() || null,
        city: form.city.trim() || null,
        state: form.state.trim() || null,
        zip: form.zip.trim() || null,
        timezone: form.timezone,
        description: form.description.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', business.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    }
    setSaving(false);
  };

  const tabs = [
    { id: 'business' as const, label: 'Business Profile', icon: Building2 },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
  ];

  return (
    <div>
      <Header title="Settings" subtitle="Manage your account and business settings" />

      {/* Tab nav */}
      <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Business Profile Tab */}
      {activeTab === 'business' && (
        <div className="max-w-2xl space-y-4">
          {/* Business Details Card */}
          <Card>
            <CardHeader
              title="Business Information"
              subtitle="Your public-facing business details"
            />
            <CardBody>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}
                  {saved && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>Business profile saved successfully.</span>
                    </div>
                  )}

                  <Input
                    label="Business Name"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="My Business"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="hello@mybusiness.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button
                variant="primary"
                icon={<Save size={15} />}
                onClick={handleSave}
                loading={saving}
                disabled={loading}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          {/* Address Card */}
          <Card>
            <CardHeader
              title="Business Address"
              subtitle="Used for pickup locations and receipts"
            />
            <CardBody>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    value={form.address_line1}
                    onChange={(e) => updateForm('address_line1', e.target.value)}
                    placeholder="123 Main St"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={form.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      placeholder="Springfield"
                      wrapperClassName="col-span-1"
                    />
                    <Input
                      label="State"
                      value={form.state}
                      onChange={(e) => updateForm('state', e.target.value)}
                      placeholder="MO"
                    />
                    <Input
                      label="ZIP Code"
                      value={form.zip}
                      onChange={(e) => updateForm('zip', e.target.value)}
                      placeholder="65801"
                    />
                  </div>
                  <Select
                    label="Timezone"
                    value={form.timezone}
                    onChange={(e) => updateForm('timezone', e.target.value)}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz.replace('_', ' ')}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </CardBody>
            <CardFooter>
              <Button
                variant="primary"
                icon={<Save size={15} />}
                onClick={handleSave}
                loading={saving}
                disabled={loading}
              >
                Save Address
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Notifications Tab (placeholder) */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl">
          <Card>
            <CardHeader title="Notification Preferences" subtitle="Choose what you want to be notified about" />
            <CardBody>
              <div className="space-y-4">
                {[
                  { label: 'Low stock alerts', description: 'Get notified when items fall below reorder point', enabled: true },
                  { label: 'New orders', description: 'Notification for each new sale or order', enabled: true },
                  { label: 'Marketplace inquiries', description: 'When a buyer messages about a listing', enabled: true },
                  { label: 'Weekly summary', description: 'Weekly email digest of business performance', enabled: false },
                  { label: 'Price change suggestions', description: 'AI-powered pricing recommendations', enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                    <button
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        item.enabled ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          item.enabled ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="primary" icon={<Save size={15} />}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Security Tab (placeholder) */}
      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-4">
          <Card>
            <CardHeader title="Change Password" subtitle="Update your login password" />
            <CardBody>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="At least 8 characters"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Repeat new password"
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button variant="primary" icon={<Shield size={15} />}>
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader title="Account" subtitle="Manage your account" />
            <CardBody>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <p className="text-sm font-semibold text-red-800">Delete Account</p>
                  <p className="text-xs text-red-600 mt-0.5">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="danger" size="sm" className="shrink-0">
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
