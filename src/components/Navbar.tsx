'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthDropdown from './AuthDropDown';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const [username, setUsername] = useState('');
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUsername(JSON.parse(user).username);
    }
  }, []);
  // useEffect(() => {
  //   try {
  //     const rawUser = localStorage.getItem('user');
  //     if (!rawUser) return;

  //     const parsed = JSON.parse(rawUser);
  //     if (parsed?.username) {
  //       setUsername(parsed.username);
  //     }
  //   } catch (err) {
  //     console.error('Gagal parse user dari localStorage:', err);
  //   }
  // }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <header className='h-16 bg-white shadow px-10 flex items-center justify-between'>
      {/* Toggle sidebar (mobile only) */}
      <button
        onClick={onToggleSidebar}
        className='md:hidden bg-white p-2 rounded-md shadow'
        aria-label='Open sidebar'
      >
        {/* ☰ */}
        &#9776;
      </button>

      {/* Judul halaman */}
      <h1 className='text-lg font-semibold hidden md:block'>Dashboard</h1>

      <AuthDropdown username={username} />
      {/* User info */}
      {/* <div className='text-sm text-gray-600'>Welcome,{username} </div> */}

      {/* Logout button */}
      {/* <button
        onClick={handleLogout}
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
      >
        Logout
      </button> */}
      {/* make dropdown if use admin click */}
    </header>
  );
}
