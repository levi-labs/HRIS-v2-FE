import React, { useEffect } from "react";
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "../hooks/useDepartment";
import ResponseApiError from "@/lib/api-errors";
import { toast } from "react-toastify";
import CustomNotify from "./CustomNotify";

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
  const isEdit = !!id;
  const { createMutation } = useCreateDepartment();
  const { updateMutation } = useUpdateDepartment();

  const mutation = isEdit ? updateMutation : createMutation;
  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success(
        <CustomNotify title="Success" message={mutation.data.message} />,
      );
      onClose();
    }
  }, [mutation.isSuccess, mutation.data]);

  useEffect(() => {
    if (mutation.error instanceof ResponseApiError) {
      const resError = mutation.error;
      if (mutation.error.status === 401) {
        onError?.(mutation.error.message);
        // console.log("error", mutation.error.message);
      } else if (mutation.error.status === 422) {
        if (Array.isArray(resError.validationErrors)) {
          const allFields = ["name", "phone"]; // semua field yang mungkin error
          allFields.forEach((field) => {
            const input = document.getElementById(field);
            const nextEl = input?.nextElementSibling;
            const error = resError.validationErrors?.find(
              (e) => e.field === field,
            );
            if (input) {
              if (error) {
                // Jika error ada & belum ditampilkan
                if (!nextEl || !nextEl.classList.contains("validation-error")) {
                  const p = document.createElement("p");
                  p.textContent = error.message;
                  p.className = "text-red-500 text-xs mt-1 validation-error";
                  input.parentElement?.insertBefore(p, input.nextSibling);
                } else {
                  // Jika <p> sudah ada, update teks-nya (optional)
                  nextEl.textContent = error.message;
                }
              } else {
                // Jika tidak ada error tapi <p> masih ada → hapus
                if (nextEl?.classList.contains("validation-error")) {
                  nextEl.remove();
                }
              }
            }
          });
        }
      } else {
        onError?.(mutation.error.message);
      }
    }
  }, [mutation.isError, mutation.error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = (
      event.currentTarget.elements.namedItem("name") as HTMLInputElement
    )?.value;
    const phone = (
      event.currentTarget.elements.namedItem("phone") as HTMLInputElement
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
      <form className="space-y-4" onSubmit={handleSubmit} autoFocus>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Department Name
          </label>
          <input
            autoFocus
            name="name"
            type="text"
            id="name"
            defaultValue={name || ""}
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400 `}
          />
          {mutation.isError && (
            <p className="text-red-500 text-xs mt-1">
              {/* {createValidationErrors[0]} */}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            id="phone"
            defaultValue={phone || ""}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400"
          />
          {mutation.isError && (
            <p className="text-red-500 text-xs mt-1">
              {/* {createValidationErrors[1]} */}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Processing" : "Submit"}
        </button>
      </form>
    </>
  );
}
