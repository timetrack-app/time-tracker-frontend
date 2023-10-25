import { useCallback, useState } from 'react';
import { Tab, Task, TaskList } from '../../../types/entity';

export const useStartWorkSessionModals = (tabs: Tab[]) => {
  const [isOpenSelectInitialTaskModal, setIsOpenSelectInitialTaskModal] =
    useState(false);
  const [isOpenCreateInitialTaskModal, setIsOpenCreateInitialTaskModal] =
    useState(false);

  const selectableTasks = useCallback(() => {
    let taskLists: TaskList[] = [];
    for (let tab of tabs) {
      taskLists = [...taskLists, ...tab.taskLists];
    }
    if (taskLists.length < 1) return [];
    let tasks: Task[] = [];
    for (let tasklist of taskLists) {
      tasks = [...tasks, ...tasklist.tasks];
    }
    return tasks;
  }, [tabs]);

  const onClickStartWorkSession = useCallback(() => {
    const tasks = selectableTasks();
    if (tasks.length > 0) onOpenSelectInitialTaskModal();
    else onOpenCreateInitialTaskModal();
  }, [tabs]);

  const onOpenSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(true);
  }, []);

  const onCloseSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(false);
  }, []);

  const onOpenCreateInitialTaskModal = useCallback(() => {
    setIsOpenCreateInitialTaskModal(true);
  }, []);

  const onCloseCreateInitialTaskModal = useCallback(() => {
    setIsOpenCreateInitialTaskModal(false);
  }, []);

  return {
    onClickStartWorkSession,
    isOpenSelectInitialTaskModal,
    isOpenCreateInitialTaskModal,
    onCloseSelectInitialTaskModal,
    onCloseCreateInitialTaskModal,
  };
};
