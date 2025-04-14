"use client";
import React, { Suspense, useCallback, useState } from "react";
import DepartmentTable from "@/app/features/department/components/DepartmentTable";
import ProtectedPage from "../features/auth/components/ProtectedPage";
import Modal from "@/components/Modal";
import DepartmentForm from "../features/department/components/DepartmentForm";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function DepartmentPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState<string | string[]>("");
  const handleError =useCallback((error: string) => {
    setError(error);
    setIsModalOpen(true);
    console.log("oke error", error);
  }, []);

  const handleClose = useCallback(() => {
    console.log("oke close");
      setIsModalOpen(false);
      setError("");
  
  }, []);

  const handleAdd = () => {
    setIsModalOpen(true);
  };
  return (
    <ProtectedPage>
      <div className="w-full h-screen bg-white p-4">
        <h1 className="text-2xl font-semibold mb-4">Department Management</h1>
        <p className="text-sm text-gray-500 mb-4">
          This is the department page.
        </p>
        <div className="w-full flex flex-col gap-y-2 lg:flex-row lg:justify-between lg:items-center mx-auto px-10 mb-2">
          <button
            onClick={handleAdd}
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500"
          >
            Tambah
          </button>
          <div className="w-full flex flex:col lg:flex-row lg:justify-end">
            <div className="relative w-full lg:w-1/3 xl:w-1/4">
              <label
                htmlFor="search"
                className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 border-r border-slate-400 w-10 sm:w-12 lg:w-2/12"
              >
                <Search className="w-5 h-5" />
              </label>
              <input
                placeholder="Search..."
                type="text"
                name="search"
                id="search"
                className="w-full h-10 pl-16 sm:pl-24 lg:pl-16 pr-3 text-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center overflow-auto ">
          <Suspense fallback={<div>Loading...</div>}>
            <DepartmentTable onError={handleError} />
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={error ? "Error" : "Form Department"}
      >
        {error ? (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition-colors duration-200"
            >
              Login
            </button>
          </div>
        ) : (
          <DepartmentForm
            onClose={handleClose}
            onError={handleError}
          />
        )}
      </Modal>
    </ProtectedPage>
  );
}
