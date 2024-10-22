"use client";
import { createClient } from '@/utils/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthStateCheck({ children }: {children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If the user is authenticated and trying to access the login or signup pages, redirect them to projects
      if (session && (pathname === '/login' || pathname === '/signup' )) {
        router.push('/projects');
      }
      // If the user is not authenticated and trying to access a protected route, redirect them to login
      else if (!session && pathname !== '/login' && pathname !== '/signup' ) {
        router.push('/login');
      }

      setLoading(false);
    };

    checkUser();
  }, [router, supabase, pathname]);

  if (loading) return <></>;

  return children;
}
