import { useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentApi } from '../api/request';

export const useDelete = () => {
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
