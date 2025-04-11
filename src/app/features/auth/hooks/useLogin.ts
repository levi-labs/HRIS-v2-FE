import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '../api/request';
import { useRouter } from 'next/navigation';
export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    },
  });
};
