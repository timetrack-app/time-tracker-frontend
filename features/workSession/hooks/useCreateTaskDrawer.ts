import { useCallback, useState } from 'react';

export const useCreateTaskDrawer = () => {
  const [isOpenCreateTaskDrawer, setIsCreateTaskDrawerOpen] = useState(false);
  const [currentListId, setCurrentListId] = useState<number | undefined>();

  const onCloseCreateTaskDrawer = useCallback(() => {
    setIsCreateTaskDrawerOpen(false);
  }, []);

  const onOpenCreateTaskDrawer = useCallback((listId: number) => {
    setCurrentListId(listId);
    setIsCreateTaskDrawerOpen(true);
  }, []);

  return {
    currentListId,
    isOpenCreateTaskDrawer,
    onOpenCreateTaskDrawer,
    onCloseCreateTaskDrawer,
  };
};
