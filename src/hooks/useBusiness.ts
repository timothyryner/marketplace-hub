'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Business } from '@/types/database';

export function useBusiness() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Get the first business the user is a member of
      const { data: membership } = await supabase
        .from('business_members')
        .select('business_id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .limit(1)
        .single();

      if (membership) {
        const { data: biz } = await supabase
          .from('businesses')
          .select('*')
          .eq('id', membership.business_id)
          .single();

        setBusiness(biz);
      }

      setLoading(false);
    };

    fetchBusiness();
  }, []);

  return { business, loading };
}
