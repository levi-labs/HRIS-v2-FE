'use client';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
        >
          ✕
        </button>

        {/* Title */}
        {title && <h2 className='text-xl font-semibold mb-4'>{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
