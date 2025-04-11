'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const disabledMenu = ['/auth/login', '/auth/register'];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {disabledMenu.includes(pathname) ? (
        <main>{children}</main>
      ) : (
        <div className='flex h-screen bg-slate-200'>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className='flex flex-col flex-1 overflow-hidden'>
            <Navbar onToggleSidebar={() => setSidebarOpen(true)} />
            <main className='flex-1 overflow-y-auto p-4'>{children}</main>
          </div>
        </div>
      )}
    </>
  );
}
