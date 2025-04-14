// import { useEffect, useState } from 'react';
// import { User } from '../types/auth';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/request';

export const useMe = () => {
  // const [user, setUser] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isInitialized, setIsInitialized] = useState(false);
  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.me,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    retry: false,
    // onSuccess: (data) => {
  })
  // useEffect(() => {
  //   const storeUser = localStorage.getItem('user');
   
  //   try {
  //     if (storeUser && storeUser !== 'undefined') {
  //       const parsedUser = JSON.parse(storeUser);
  //       setUser(parsedUser);
  //     }
  //   } catch (err) {
  //     console.error('Gagal parse user dari localStorage:', err);
  //   } finally {
  //     setIsLoading(false);
  //     setIsInitialized(true);
  //   }
  // }, []);

  // return {
  //   data: user,
  //   isLoading,
  //   isError: isInitialized ? !user : false,
  //   isInitialized,
  // };
};

