import React from 'react';
import departmentEndpoints from './endpoints';
import ResponseApiError from '@/lib/api-errors';

export const departmentApi = {
  getAll: async () => {
    const res = await fetch(departmentEndpoints.getAll(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const error: { success: boolean; message: string; errors?: any[] } =
        await res.json();
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const result = await res.json();

    return result.data;
  },

  getById: async (id: number) => {
    const res = await fetch(departmentEndpoints.getOne(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const error: { success: boolean; message: string; errors?: any[] } =
        await res.json();
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const result = await res.json();

    return result.data;
  },

  create: async (data: any) => {
    const res = await fetch(departmentEndpoints.create(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error: { success: boolean; message: string; errors?: any[] } =
        await res.json();
      console.log('error', error.errors);
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const result = await res.json();
    console.log('result', result);

    return result.data;
  },

  delete: async (id: number) => {
    const res = await fetch(departmentEndpoints.delete(id), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const error: { success: boolean; message: string; errors?: any[] } =
        await res.json();
      throw new ResponseApiError(res.status, error.message, error.errors);
    }
    const result = await res.json();

    return result.data;
  },
};
