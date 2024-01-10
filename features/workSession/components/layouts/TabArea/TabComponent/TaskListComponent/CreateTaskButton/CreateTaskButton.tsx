import React from 'react';

// components and related hooks
import CreateTaskFormTrigger from './CreateTaskFormTrigger';
import { useCreateTaskFormCard } from './CreateTaskFormCard';
import CreateTaskFormCard from './CreateTaskFormCard/CreateTaskFormCard';

type CreateTaskButtonProps = {
  taskListId: number;
  handleCreateNewTask: (
    tabId: number,
    listId: number,
    taskName: string,
    description: string,
  ) => Promise<void>;
};

const CreateTaskButton = ({
  taskListId,
  handleCreateNewTask,
}: CreateTaskButtonProps) => {
  const {
    isOpenCreateTaskFormCard,
    currentListId,
    onCloseCreateTaskFormCard,
    onOpenCreateTaskFormCard,
  } = useCreateTaskFormCard();
  return isOpenCreateTaskFormCard ? (
    <CreateTaskFormCard
      isOpen={isOpenCreateTaskFormCard}
      onClose={onCloseCreateTaskFormCard}
      listId={currentListId}
      handleCreateNewTask={handleCreateNewTask}
    />
  ) : (
    <CreateTaskFormTrigger
      onClickCreateTaskCard={() => onOpenCreateTaskFormCard(taskListId)}
    />
  );
};

export default CreateTaskButton;
