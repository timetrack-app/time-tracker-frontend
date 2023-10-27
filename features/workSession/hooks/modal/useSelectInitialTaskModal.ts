import { useCallback, useState } from 'react';

export const useSelectInitialTaskModal = () => {
  const [isOpenSelectInitialTaskModal, setIsOpenSelectInitialTaskModal] =
    useState(false);

  const onOpenSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(true);
  }, []);

  const onCloseSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(false);
  }, []);

  return {
    isOpenSelectInitialTaskModal,
    onOpenSelectInitialTaskModal,
    onCloseSelectInitialTaskModal,
  };
};
