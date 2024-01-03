import { useState, useCallback } from 'react';
import { Task } from '../../../types/entity';

export const useTaskEditMenuBarAndRenamePopover = () => {
  const [isOpenTaskEditMenuBar, setIsOpenTaskEditMenuBar] = useState(false);
  const [isOpenTaskRenamePopover, setIsOpenTaskRenamePopover] = useState(false);
  const [taskPosition, setEditableTaskSelectorPosition] =
    useState<DOMRect | null>();

  const [currentTask, setCurrentTask] = useState<Task>();

  const toggleTaskEditMenuBar = useCallback(
    (rect: DOMRect, task?: Task) => {
      if (!isOpenTaskEditMenuBar && task) {
        setCurrentTask(task);
        setEditableTaskSelectorPosition(rect);
      } else setCurrentTask(undefined);
      setIsOpenTaskEditMenuBar((prev) => !prev);
    },
    [isOpenTaskEditMenuBar],
  );

  const onOpenTaskRenamePopover = useCallback(() => {
    setIsOpenTaskEditMenuBar(false);
    setIsOpenTaskRenamePopover(true);
  }, []);

  const onCloseTaskRenamePopover = useCallback(() => {
    setIsOpenTaskRenamePopover(false);
  }, []);

  const onCloseTaskEditMenuBarAndTaskRenamePopover = useCallback(() => {
    setIsOpenTaskEditMenuBar(false);
    setIsOpenTaskRenamePopover(false);
  }, []);

  return {
    isOpenTaskEditMenuBar,
    isOpenTaskRenamePopover,
    taskPosition,
    currentTask,
    toggleTaskEditMenuBar,
    onOpenTaskRenamePopover,
    onCloseTaskRenamePopover,
    onCloseTaskEditMenuBarAndTaskRenamePopover,
  };
};
