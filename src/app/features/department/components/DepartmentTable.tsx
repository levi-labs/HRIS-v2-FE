"use client";
import TableHeader from "@/components/table/TableHeader";

import {
  useDepartments,
  useDepartmentById,
  useDeleteDepartment,
} from "@/app/features/department/hooks/useDepartment";
import TableRow from "@/components/table/TableRow";
import Modal from "@/components/Modal";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DepartmentForm from "./DepartmentForm";
import ResponseApiError from "@/lib/api-errors";
import CustomNotify from "./CustomNotify";
import { toast } from "react-toastify";
import DepartmentPagination from "./DepartmentPagination";
import { useRouter } from "next/navigation";

type Department = {
  id: number;
  name: string;
  phone: string;
};

export default function DepartmentTable({
  onError,
}: {
  onError?: (error: string) => void;
  search?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") || "1";
  const [dataId, setDataId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isToastShown, setIsToastShown] = useState(false);
  const {
    data: dataDepartments,
    isPending: isPendingGetAll,
    isError: isErrorGetAll,
    error: errorGetAll,
  } = useDepartments(page ? Number(page) : 1, 2);

  const { data: department, isPending: isPendingById } =
    useDepartmentById(dataId);
  const { deleteMutation } = useDeleteDepartment();

  const columns = ["No", "Name", "Phone", "Actions"];
  const onEdit = (id: number) => {
    setDataId(id);
    setIsModalOpen(true);
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success(
        <CustomNotify title="Success" message={deleteMutation.data.message} />,
      );
      if (dataDepartments?.data.length > 0 && Number(page) > 1) {
        const newParams = new URLSearchParams(params);
        newParams.set("page", (Number(page) - 1).toString());
        router.replace(`?${newParams.toString()}`);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMutation.isSuccess, deleteMutation.data?.message]);
  // useEffect(() => {
  //   if (!deleteMutation.isSuccess) {
  //     setIsToastShown(false);
  //   }
  // }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (isErrorGetAll && (errorGetAll as ResponseApiError)?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("error dari table department", errorGetAll);
      
      
      onError!((errorGetAll as ResponseApiError).message);
      
    }
  }, [isErrorGetAll, errorGetAll, onError,router]);
  

  const renderTableContent = () => {
    if (isPendingGetAll && !isErrorGetAll) {
      return (
        <tr>
          <td colSpan={columns.length} className="py-4 text-center">
            Loading...
          </td>
        </tr>
      );
    }

    return (
      <TableRow
        data={dataDepartments?.data || []}
        colSpan={columns.length}
        renderCell={(item: Department, index) => (
          <>
            <td className="py-3 px-4">
              {dataDepartments?.pagination.skip + index + 1}
            </td>
            <td className="py-3 px-4">{item.name}</td>
            <td className="py-3 px-4">{item.phone}</td>
            <td className="py-3 px-4">
              <button
                onClick={() => onEdit(item.id)}
                className="text-white bg-blue-400 my-2 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm lg:mr-2 hover:bg-blue-600 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-white bg-red-400 py-2 px-4 rounded-md w-full xl:w-1/6 text-sm hover:bg-red-600 transition-colors duration-200"
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
      <table className="table-auto w-full h-full rounded-md shadow-md">
        <TableHeader columns={columns} />
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {renderTableContent()}
        </tbody>
      </table>

      <DepartmentPagination
        currentPage={dataDepartments?.pagination.page}
        totalPages={dataDepartments?.pagination.totalPages}
      />
      {/* Modal Edit Data  */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title="Edit Department">
        {isPendingById && <p>Loading...</p>}
        <DepartmentForm
          id={department?.id}
          name={department?.name}
          phone={department?.phone}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
}
