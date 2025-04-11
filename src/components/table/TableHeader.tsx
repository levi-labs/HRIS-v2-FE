import React from 'react';

type TableHeaderProps = {
  columns: string[];
};
export default function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr className='w-full bg-gray-200 text-center'>
        {columns.map((col, index) => (
          <th key={index} className='py-2 px-4'>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
