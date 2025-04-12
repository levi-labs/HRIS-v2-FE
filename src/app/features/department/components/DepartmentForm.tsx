import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import {
  useCreateDepartment,
  useUpdateDepartment,
} from '../hooks/useDepartment';
import ResponseApiError from '@/lib/api-errors';
import { toast } from 'react-toastify';
import CustomNotify from './CustomNotify';

type DepartmentFormProps = {
  id?: number;
  name?: string;
  phone?: string;
  onClose: () => void;
  onError?: (error: string) => void;
};
export default function DepartmentForm({
  id,
  name,
  phone,
  onClose,
  onError,
}: DepartmentFormProps) {
  const router = useRouter();
  const isEdit = !!id;
  const {
    createMutation,
    error: createError,
    validationErrors: createValidationErrors,
  } = useCreateDepartment();
  const {
    updateMutation,
    error: updateError,
    validationErrors: updateValidationErrors,
  } = useUpdateDepartment();

  const mutation = isEdit ? updateMutation : createMutation;
  useEffect(() => {
    if (mutation.isSuccess) {
      console.log('mutation', mutation.data.message);
      toast.success(
        <CustomNotify title='Success' message={mutation.data.message} />
      );
      onClose();
    }
  }, [mutation.isSuccess, mutation.data]);

  useEffect(() => {
    if (mutation.error instanceof ResponseApiError) {
      if (mutation.error.status === 401) {
        onError?.(mutation.error.message);
        console.log(
          'createError',
          (createMutation.error as ResponseApiError).status
        );
      } else if (mutation.error.status === 422) {
        console.log('createValidationErrors', createValidationErrors);
      } else {
        onError?.(mutation.error.message);
      }
    }
    // onClose();
  }, [mutation.isError, mutation.error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = (
      event.currentTarget.elements.namedItem('name') as HTMLInputElement
    )?.value;
    const phone = (
      event.currentTarget.elements.namedItem('phone') as HTMLInputElement
    )?.value;
    const payload = {
      name,
      phone,
    };

    if (isEdit) {
      updateMutation.mutate({ id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };
  return (
    <>
      <form className='space-y-4' onSubmit={handleSubmit} autoFocus>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Department Name
          </label>
          <input
            autoFocus
            name='name'
            type='text'
            id='name'
            defaultValue={name || ''}
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
            defaultValue={phone || ''}
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md'
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Processing' : 'Submit'}
        </button>
      </form>
    </>
  );
}
