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

type Department = {
  id: number;
  name: string;
  phone: string;
};

export default function DepartmentTable() {
  const router = useRouter();
  const { data, isPending, isError, error } = useDepartments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

  const onEdit = (id: number) => {
    //   alert(`Edit ${id}`);
    setIsModalOpen(true);
  };
  const deleteDepartment = useDeleteDepartment();
  const onDelete = (id: number) => {
    deleteDepartment.handleDelete(id);
  };

  const handleToLogin = () => {
    setIsModalErrorOpen(false);
    router.push('/auth/login');
  };

  // if (isPending && !isError) return <div>Loading...</div>;

  // useEffect(() => {

  //   if (isError) {
  //     setIsModalErrorOpen(true);
  //   }
  // }, [isError]);

  if (isError) {
    return (
      <Modal
        isOpen={isModalErrorOpen}
        onClose={() => setIsModalErrorOpen(false)}
        title='Error'
      >
        <p>{error.message}</p>
        <button
          onClick={handleToLogin}
          className='mt-4 bg-gray-200 px-4 py-2 rounded-md'
        >
          Login
        </button>
      </Modal>
    );
  }

  const columns = ['No', 'Name', 'Phone', 'Actions'];
  return (
    <table className='table-auto w-full rounded-md shadow-md'>
      <TableHeader columns={columns} />
      <tbody className='bg-white divide-y divide-gray-200 text-center'>
        {isPending ? (
          <tr>
            <td colSpan={columns.length} className='py-4 text-center'>
              Loading...
            </td>
          </tr>
        ) : (
          <TableRow
            data={data}
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
          // <>ok</>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title='Edit Department'
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
            laudantium nobis quaerat accusantium a nostrum magnam quam et est
            facilis voluptatum maiores similique reiciendis totam eos, cumque
            eaque mollitia temporibus doloribus iure? Cum fugiat consectetur
            architecto libero sit nostrum. Libero impedit deleniti placeat eum
            atque sint minima excepturi molestias. Quas.
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className='mt-4 bg-gray-200 px-4 py-2 rounded-md'
          >
            Tutup
          </button>
        </Modal>
        {/* <Modal
          isOpen={isModalErrorOpen}
          onClose={() => setIsModalErrorOpen(false)}
          title='Oops!'
        >
          <p className='text-red-500'>{(error as Error)?.message}</p>
          <button
            onClick={() => handleToLogin()}
            className='mt-4 bg-slate-900 text-white px-4 py-2 rounded-md'
          >
            Login
          </button>
        </Modal> */}
      </tbody>
    </table>
  );
}
