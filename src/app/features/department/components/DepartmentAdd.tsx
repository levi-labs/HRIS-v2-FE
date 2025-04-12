import Modal from '@/components/Modal';
import React, { useState } from 'react';
import DepartmentForm from './DepartmentForm';

export default function DepartmentAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Form Department'
      >
        <DepartmentForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
