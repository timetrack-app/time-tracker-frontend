import { useCallback, useState } from 'react';

export const useDeleteListConfirmModal = () => {
  const [isOpenDeleteListConfirmModal, setIsDeleteListConfirmOpen] =
    useState(false);

  const onOpenDeleteListConfirmModal = useCallback(() => {
    setIsDeleteListConfirmOpen(true);
  }, []);

  const onCloseDeleteListConfirmModal = useCallback(() => {
    setIsDeleteListConfirmOpen(false);
  }, []);

  return {
    isOpenDeleteListConfirmModal,
    onOpenDeleteListConfirmModal,
    onCloseDeleteListConfirmModal,
  };
};
