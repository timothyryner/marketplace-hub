'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from './sidebar';
import { createClient } from '@/lib/supabase/client';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [userEmail, setUserEmail] = useState('');
  const [businessName, setBusinessName] = useState('MarketplaceHub');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) setUserEmail(user.email);

      if (user) {
        const { data: business } = await supabase
          .from('businesses')
          .select('name')
          .eq('owner_id', user.id)
          .single();
        if (business?.name) setBusinessName(business.name);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar businessName={businessName} userEmail={userEmail} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
