'use client';
import TableHeader from '@/components/table/TableHeader';

import {
  useDepartments,
  useDepartmentById,
  useDeleteDepartment,
} from '@/app/features/department/hooks/useDepartment';
import TableRow from '@/components/table/TableRow';
import Modal from '@/components/Modal';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDelete } from '../hooks/useDelete';
import DepartmentForm from './DepartmentForm';
import ResponseApiError from '@/lib/api-errors';
import CustomNotify from './CustomNotify';
import { toast } from 'react-toastify';

type Department = {
  id: number;
  name: string;
  phone: string;
};

export default function DepartmentTable({
  onError,
}: {
  onError?: (error: string) => void;
}) {
  const router = useRouter();
  const [dataId, setDataId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  const {
    data: dataDepartments,
    isPending: isPendingGetAll,
    isError: isErrorGetAll,
    error: errorGetAll,
  } = useDepartments();
  const {
    data: department,
    isPending: isPendingById,
    isError: isErrorById,
  } = useDepartmentById(dataId);
  const { deleteMutation } = useDeleteDepartment();

  const columns = ['No', 'Name', 'Phone', 'Actions'];
  const onEdit = (id: number) => {
    setDataId(id);
    setIsModalOpen(true);
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleToLogin = () => {
    setIsModalErrorOpen(false);
    router.push('/auth/login');
  };

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success(
        <CustomNotify title='Success' message={deleteMutation.data.message} />
      );
    }
  }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (isErrorGetAll && (errorGetAll as ResponseApiError)?.status === 401) {
      onError?.((errorGetAll as ResponseApiError).message);
      setIsModalErrorOpen(true);
    }
  }, [isErrorGetAll, errorGetAll]);

  const renderTableContent = () => {
    if (isPendingGetAll && !isErrorGetAll) {
      return (
        <tr>
          <td colSpan={columns.length} className='py-4 text-center'>
            Loading...
          </td>
        </tr>
      );
    }

    return (
      <TableRow
        data={dataDepartments}
        colSpan={columns.length}
        renderCell={(item: Department, index) => (
          <>
            <td className='py-3 px-4'>{index + 1}</td>
            <td className='py-3 px-4'>{item.name}</td>
            <td className='py-3 px-4'>{item.phone}</td>
            <td className='py-3 px-4'>
              <button
                onClick={() => onEdit(item.id)}
                className='text-white bg-blue-400 my-2 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm lg:mr-2 hover:bg-blue-600 transition-colors duration-200'
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className='text-white bg-red-400 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm hover:bg-red-600 transition-colors duration-200'
              >
                Delete
              </button>
            </td>
          </>
        )}
      />
    );
  };
  return (
    <>
      <table className='table-auto w-full rounded-md shadow-md'>
        <TableHeader columns={columns} />
        <tbody className='bg-white divide-y divide-gray-200 text-center'>
          {renderTableContent()}
        </tbody>
      </table>
      {/* Modal Edit Data  */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Edit Department'
      >
        {isPendingById && <p>Loading...</p>}
        <DepartmentForm
          id={department?.id}
          name={department?.name}
          phone={department?.phone}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Modal Error Data  */}
      {/* {isErrorGetAll && (
        <Modal
          isOpen={isModalErrorOpen}
          onClose={() => setIsModalErrorOpen(false)}
          title='Oops!'
        >
          <div className='flex flex-col items-center justify-center'>
            <p className='text-red-500'>
              {(errorGetAll as ResponseApiError)?.message}
            </p>
            <button
              onClick={() => handleToLogin()}
              className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors duration-200'
            >
              Login
            </button>
          </div>
        </Modal>
      )} */}
    </>
  );
}
