import { useCallback, useState } from 'react';

export const useDeleteTabConfirmModal = () => {
  const [isOpenDeleteTabConfirmModal, setIsDeleteTabConfirmOpen] =
    useState(false);

  const onOpenDeleteTabConfirmModal = useCallback(() => {
    setIsDeleteTabConfirmOpen(true);
  }, []);

  const onCloseDeleteTabConfirmModal = useCallback(() => {
    setIsDeleteTabConfirmOpen(false);
  }, []);

  return {
    isOpenDeleteTabConfirmModal,
    onOpenDeleteTabConfirmModal,
    onCloseDeleteTabConfirmModal,
  };
};
