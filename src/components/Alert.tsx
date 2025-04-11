import React from 'react';

interface AlertProps {
  status: 'success' | 'info' | 'warning' | 'error';
  message: string | string[];
  className?: string; // Untuk menambahkan class Tailwind CSS kustom
  onClose?: () => void; // Fungsi opsional untuk menangani penutupan alert
}

const statusColors = {
  success: 'bg-green-100 text-green-700 border-green-400',
  info: 'bg-blue-100 text-blue-700 border-blue-400',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  error: 'bg-red-100 text-red-700 border-red-400',
};

const Alert: React.FC<AlertProps> = ({
  status,
  message,
  className,
  onClose,
}) => {
  const alertClasses = `border rounded-md p-4 mb-4 ${statusColors[status]} ${
    className || ''
  }`;
  return (
    <div className={alertClasses} role='alert'>
      <strong className='font-bold'>
        {status.charAt(0).toUpperCase() + status.slice(1)}!
      </strong>{' '}
      {Array.isArray(message) ? (
        <ol className='list-disc pl-4 text-sm'>
          {message.map((msg, index) => (
            <li className='mb-2' key={index}>
              {msg}
            </li>
          ))}
        </ol>
      ) : (
        <span>{message}</span>
      )}
      {onClose && (
        <button
          type='button'
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
          onClick={onClose}
        >
          <span className='sr-only'>Close</span>
          <svg
            className='h-4 w-4 fill-current'
            viewBox='0 0 20 20'
            aria-hidden='true'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
