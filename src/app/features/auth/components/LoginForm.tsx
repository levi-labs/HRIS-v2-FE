'use client';
import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import Alert from '@/components/Alert';
import ResponseApiError from '@/lib/api-errors';
import { LoginResponse } from '../types/auth';
import useAuthSubmit from '../hooks/useAuth';

export default function LoginForm() {
  const { handleSubmit, loginMutation, error, validationErrors } =
    useAuthSubmit();

  return (
    <div className='bg-white p-4 shadow-xl xl:w-1/4 rounded-md'>
      <h2 className='text-center text-lg font-semibold mb-4'>
        Login HRIS System
      </h2>
      {error && (
        <Alert status='error' message={error} onClose={() => error('')} />
      )}
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </label>
          <input
            name='username'
            type='text'
            id='text'
            className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400 ${
              validationErrors.includes('username') ? 'border-red-500' : ''
            } `}
          />
          {validationErrors.includes('username') && (
            <p className='text-red-500 text-xs mt-1'>{validationErrors[0]}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            name='password'
            type='password'
            id='password'
            className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-slate-400'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-slate-900 hover:bg-slate-700 text-white py-2 px-4 rounded-md'
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
