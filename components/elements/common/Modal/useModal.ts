import { useState } from 'react';

/**
 * Custom hook for managing Modal component open/close state
 * Use it with Modal component
 *
 * @return {
      isModalOpen: boolean;
      openModal: () => void;
      closeModal: () => void;
    }
 */
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
