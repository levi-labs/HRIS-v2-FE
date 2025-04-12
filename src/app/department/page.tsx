'use client';
import React, { useState } from 'react';
import DepartmentTable from '@/app/features/department/components/DepartmentTable';
import ProtectedPage from '../features/auth/components/ProtectedPage';
import Modal from '@/components/Modal';
import DepartmentForm from '../features/department/components/DepartmentForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function DepartmentPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
  const [error, setError] = useState<string | string[]>('');
  const handleError = (error: string) => {
    setIsModalOpen(true);
    setError(error);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };
  return (
    <ProtectedPage>
      <div className='w-full h-full lg:h-screen bg-white p-4'>
        <h1 className='text-2xl font-semibold mb-4'>Department Management</h1>
        <p className='text-sm text-gray-500 mb-4'>
          This is the department page.
        </p>
        <button
          onClick={handleAdd}
          className='mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 mb-5'
        >
          Tambah
        </button>
        <div className='w-full flex lg:flex-row flex-col justify-center overflow-auto bg-red-300'>
          <DepartmentTable onError={handleError} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={error ? 'Error' : 'Form Department'}
      >
        {error ? (
          <div className='text-center'>
            <p className='text-red-500'>{error}</p>
            <button
              onClick={() => router.push('/auth/login')}
              className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors duration-200'
            >
              Login
            </button>
          </div>
        ) : (
          <DepartmentForm
            onClose={() => setIsModalOpen(false)}
            onError={handleError}
          />
        )}
      </Modal>
    </ProtectedPage>
  );
}
function WithAvatar() {
  return (
    <div className='flex flex-col pl-8'>
      <div className='grid z-10 place-items-center absolute -left-12 top-1/2 -translate-y-1/2 size-20 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
        F
      </div>
      <p className='text-white font-semibold'>John Doe</p>
      <p className='text-sm text-zinc-400'>You have a new message from Fadi</p>
    </div>
  );
}
