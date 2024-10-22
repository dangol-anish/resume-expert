"use client"
import { createClient } from '@/utils/supabase/client';
import { AppProps } from 'next/app';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
    const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push('/projects');
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);


  if (loading) return <p></p>;

  return <Component {...pageProps} />;
}
