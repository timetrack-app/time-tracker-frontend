import { useState } from 'react';

export const useCreateTaskFormCard = () => {
  const [isOpenCreateTaskFormCard, setIsOpenCreateTaskFormCard] =
    useState(false);
  const [currentListId, setCurrentListId] = useState<number | undefined>();

  const onCloseCreateTaskFormCard = () => {
    setIsOpenCreateTaskFormCard(false);
  };

  const onOpenCreateTaskFormCard = (listId: number) => {
    setIsOpenCreateTaskFormCard(true);
    setCurrentListId(listId);
  };
  return {
    isOpenCreateTaskFormCard,
    currentListId,
    onCloseCreateTaskFormCard,
    onOpenCreateTaskFormCard,
  };
};
