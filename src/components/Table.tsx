import React from 'react';

export interface TableComponentsProps {
  title: string;
  data: string[];
}
export default function TableComponents({ title, data }: TableComponentsProps) {
  return (
    <div className='bg-white rounded-xl shadow-md p-6 overflow-x-auto'>
      <h2 className='text-lg font-semibold mb-4'>{title}</h2>
      <table className='min-w-full text-sm text-left'>
        <thead className='bg-gray-100 text-gray-600 uppercase text-xs'>
          <tr>
            <th className='py-3 px-4'>Name</th>
            <th className='py-3 px-4'>Position</th>
            <th className='py-3 px-4'>Status</th>
            <th className='py-3 px-4'>Actions</th>
          </tr>
        </thead>
        <tbody>{/* Tambahkan baris lainnya jika perlu */}</tbody>
      </table>
    </div>
  );
}
