'use client';
import LoginForm from '@/app/features/auth/components/LoginForm';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useMe } from '@/app/features/auth/hooks/useMe';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data, isLoading, isError, isInitialized } = useMe();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && isInitialized && data) {
  //     router.push('/dashboard');
  //   }
  // }, [isInitialized, isLoading, data]);

  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='w-full flex flex-col justify-center items-center gap-2'>
        <div className='w-48 lg:w-72 h-32 lg:mb-4'>
          <img src='/assets/img/hriss.png' alt='Logo' />
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
