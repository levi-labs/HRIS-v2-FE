import React from 'react';

type TableRowProps<T> = {
  data: T[];
  renderCell: (item: T, index: number) => React.ReactNode;
  colSpan?: number;
};
export default function TableRow<T>({
  data,
  renderCell,
  colSpan = 3,
}: TableRowProps<T>) {
  if (!data || data.length === 0) {
    return (
      <tr className='w-full'>
        <td colSpan={colSpan} className='text-center'>
          No data available
        </td>
      </tr>
    );
  }
  return (
    <>
      {data.map((item, index) => (
        <tr
          className='border-t hover:bg-gray-50 transition-colors duration-200 cursor-pointer group'
          key={index}
        >
          {renderCell(item, index)}
        </tr>
      ))}
    </>
  );
}
