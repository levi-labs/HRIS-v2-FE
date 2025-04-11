'use client';
import DashboardCards from '@/components/DashboardCards';
import React from 'react';
import Attendances from './components/Attendances';
import Transaction from './components/Transaction';
import Upcoming from './components/Upcoming';
import ProtectedPage from '../features/auth/components/ProtectedPage';

export default function DashboardPage() {
  return (
    <ProtectedPage>
      <div className='w-full  sm:h-full bg-white p-4'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <p>This is the dashboard page.</p>
        {/* make new row */}

        {/* make 2 columns */}
        {/* <div className='mt-4 p-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <div className='bg-white p-6 rounded-xl shadow-md border h-full flex flex-col justify-between hover:shadow-lg transition'>
            <div className='flex items-center gap-4'>
              <div className='bg-blue-100 p-3 rounded-full text-blue-600'>
                📊
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Analytics
                </h3>
                <p className='text-sm text-gray-500'>View insights</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md border h-full flex flex-col justify-between hover:shadow-lg transition'>
            <div className='flex items-center gap-4'>
              <div className='bg-green-100 p-3 rounded-full text-green-600'>
                👥
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>Users</h3>
                <p className='text-sm text-gray-500'>Manage employees</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md border h-full flex flex-col justify-between hover:shadow-lg transition'>
            <div className='flex items-center gap-4'>
              <div className='bg-yellow-100 p-3 rounded-full text-yellow-600'>
                💼
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>Payroll</h3>
                <p className='text-sm text-gray-500'>Salary & slips</p>
              </div>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md border h-full flex flex-col justify-between hover:shadow-lg transition'>
            <div className='flex items-center gap-4'>
              <div className='bg-red-100 p-3 rounded-full text-red-600'>🏢</div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800'>Offices</h3>
                <p className='text-sm text-gray-500'>Branch locations</p>
              </div>
            </div>
          </div>
        </div> */}
        <DashboardCards />
        <div className='flex flex-col gap-y-5 xl:flex-row justify-between lg:gap-x-5 p-4'>
          <div className='flex flex-col flex-[3] gap-y-5'>
            <Transaction />
            <Upcoming />
          </div>
          <div className='flex flex-col flex-[1]'>
            <Attendances />
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
