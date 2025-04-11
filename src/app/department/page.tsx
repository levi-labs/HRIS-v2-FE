'use client';
import React, { useState } from 'react';
import DepartmentTable from '@/app/features/department/components/DepartmentTable';
import ProtectedPage from '../features/auth/components/ProtectedPage';
import Modal from '@/components/Modal';
import DepartmentForm from '../features/department/components/DepartmentForm';

export default function DepartmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ProtectedPage>
      <div className='w-full sm:h-full bg-white p-4'>
        <h1 className='text-2xl font-semibold mb-4'>Department Management</h1>
        <p className='text-sm text-gray-500 mb-4'>
          This is the department page.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className='mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 mb-5'
        >
          Tambah
        </button>
        <div className='flex xl:flex-row flex-col justify-center'>
          <DepartmentTable />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Form Department'
      >
        <DepartmentForm onClose={() => setIsModalOpen(false)} />
        {/* <button
          onClick={() => setIsModalOpen(false)}
          className='mt-4 bg-gray-200 px-4 py-2 rounded-md'
        >
          Tutup
        </button> */}
      </Modal>
    </ProtectedPage>
  );
}
