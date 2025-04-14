'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentApi } from "@/app/features/department/api/request";
import ResponseApiError from "@/lib/api-errors";
import { useState } from "react";

export const useDepartments = (page = 1, limit = 10, search = "") => {
 
 
  return useQuery({
    queryKey: ["departments", page, search],
    queryFn: 
      () => departmentApi.getAll(page, limit, search),
    retry: false,

    
  });
};

export const useDepartmentById = (id: number) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: () => departmentApi.getById(id),
    enabled: !!id,
  });
};
export const useCreateDepartment = () => {
  const [error, setError] = useState<string | string[]>("");
  const [validationErrors, setValidationErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: departmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      setError(""); // Reset pesan error umum
      setValidationErrors([]); // Reset array validationErrors          if (error instanceof ResponseApiError) {
      if (error instanceof ResponseApiError) {
        if (error.status === 401) {
          setError(error.message);
        } else if (Array.isArray(error.validationErrors)) {
          const messages = error.validationErrors.map(
            (validationError) => validationError.message,
          );
          setError(messages);
          setValidationErrors(error.validationErrors);
        } else {
          setError(error.message || "Terjadi kesalahan saat login.");
        }
      } else if (error instanceof Error) {
        setError(error.message || "Terjadi kesalahan jaringan atau lainnya.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  return {
    createMutation,
    error,
    validationErrors,
  };
};
type UpdateDepartmentParams = {
  id: number;
  data: { name: string; phone: string };
};

export const useUpdateDepartment = () => {
  const [error, setError] = useState<string | string[]>("");
  const [validationErrors, setValidationErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    //update have 2 params id dan data
    mutationFn: ({ id, data }: UpdateDepartmentParams) =>
      departmentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      setError(""); // Reset pesan error umum
      setValidationErrors([]); // Reset array validationErrors          if (error instanceof ResponseApiError) {
      if (error instanceof ResponseApiError) {
        if (error.status === 401) {
          setError(error.message);
        } else if (Array.isArray(error.validationErrors)) {
          const messages = error.validationErrors.map(
            (validationError) => validationError.message,
          );
          setError(messages);
          setValidationErrors(error.validationErrors);
        } else {
          setError(error.message || "Terjadi kesalahan saat login.");
        }
      } else if (error instanceof Error) {
        setError(error.message || "Terjadi kesalahan jaringan atau lainnya.");
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  return {
    updateMutation,
    error,
    validationErrors,
  };
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: departmentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  return { deleteMutation };
};
