"use client";
import { createClient } from '@/utils/supabase/client';
import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push('/projects');
      } else {
        setLoading(false); // Set loading to false when no session is found
      }
    };

    checkUser();
  }, [router, supabase]);

  // Loading screen while checking authentication
  if (loading) return <p></p>;

  // Return children if not loading
  return <>{children}</>;
}
