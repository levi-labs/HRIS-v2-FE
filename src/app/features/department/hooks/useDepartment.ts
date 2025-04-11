import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import departmentEndpoints from '../api/endpoints';
import { departmentApi } from '@/app/features/department/api/request';
import ResponseApiError from '@/lib/api-errors';
import { useState } from 'react';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: departmentApi.getAll,
  });
};

export const useDepartmentById = (id: number) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => departmentApi.getById(id),
  });
};

export const useCreateDepartment = () => {
  const [error, setError] = useState<string | string[]>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: departmentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = (
      event.currentTarget.elements.namedItem('name') as HTMLInputElement
    )?.value;
    const phone = (
      event.currentTarget.elements.namedItem('phone') as HTMLInputElement
    )?.value;

    createMutation.mutate(
      { name, phone },
      {
        onSuccess: (data) => {
          console.log('data', data);
        },
        onError: (error) => {
          setError(''); // Reset pesan error umum
          setValidationErrors([]); // Reset array validationErrors          if (error instanceof ResponseApiError) {
          if (error instanceof ResponseApiError) {
            if (error.status === 401) {
              setError(error.message);
            } else if (Array.isArray(error.validationErrors)) {
              const messages = error.validationErrors.map(
                (validationError) => validationError.message
              );
              setError(messages);
              console.log('validationErrors', messages); // Log array pesan
            } else {
              setError(error.message || 'Terjadi kesalahan saat login.');
            }
          } else if (error instanceof Error) {
            setError(
              error.message || 'Terjadi kesalahan jaringan atau lainnya.'
            );
          } else {
            setError('Terjadi kesalahan yang tidak diketahui.');
          }
        },
      }
    );
  };

  return {
    handleSubmit,
    createMutation,
    error,
    validationErrors,
  };
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: departmentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log('Success');
      },
      onError: () => {},
    });
  };
  return { handleDelete, deleteMutation };
};
