import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useCreateDepartment } from '../hooks/useDepartment';

type DepartmentFormProps = {
  onClose: () => void;
};
export default function DepartmentForm({ onClose }: DepartmentFormProps) {
  const router = useRouter();
  const { handleSubmit, createMutation, error, validationErrors } =
    useCreateDepartment();

  useEffect(() => {
    if (createMutation.isSuccess) {
      onClose();
    }
  }, [createMutation.isSuccess]);

  return (
    <>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            name
          </label>
          <input
            name='name'
            type='text'
            id='name'
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400 `}
          />
          {/* {validationErrors.includes('username') && (
            <p className='text-red-500 text-xs mt-1'>{validationErrors[0]}</p>
          )} */}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone Number
          </label>
          <input
            name='phone'
            type='text'
            id='phone'
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md'
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Processing' : 'Submit'}
        </button>
      </form>
    </>
  );
}
