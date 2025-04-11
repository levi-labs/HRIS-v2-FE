'use client';

import { ReactNode, useEffect } from 'react';
import { useMe } from '../hooks/useMe';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
  children: ReactNode;
}

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const { data: user, isLoading, isError, isInitialized } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isLoading && (isError || !user)) {
      router.replace('/auth/login');
    }
  }, [isInitialized, isLoading, isError, user, router]);

  // if (!isInitialized || isLoading) return <div>Loading...</div>; // Tampilkan loading hingga inisialisasi selesai
  return <>{children}</>;
};

export default ProtectedPage;
