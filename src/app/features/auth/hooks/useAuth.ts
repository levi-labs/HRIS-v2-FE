import React, { useState } from 'react';
import { LoginPayload, LoginResponse, UseAuthResult } from '../types/auth';
import { useMutation } from '@tanstack/react-query';
import { useLogin } from './useLogin';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/request';
import ResponseApiError from '@/lib/api-errors';

const useAuthSubmit = (): any => {
  const [error, setError] = useState<string | string[]>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = (
      event.currentTarget.elements.namedItem('username') as HTMLInputElement
    )?.value;
    const password = (
      event.currentTarget.elements.namedItem('password') as HTMLInputElement
    )?.value;

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log('data', data);
        },
        onError: (error) => {
          setError(''); // Reset pesan error umum
          setValidationErrors([]); // Reset array validationErrors

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
    loginMutation,
    error,
    validationErrors,
  };
};

export default useAuthSubmit;
