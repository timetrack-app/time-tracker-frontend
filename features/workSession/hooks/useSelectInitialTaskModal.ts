import { useCallback, useState } from 'react';
import { Tab } from '../../../types/entity';
import { TaskInfoForInitialSelection } from '../types';

export const useSelectInitialTaskModal = (tabs: Tab[]) => {
  const [isOpenSelectInitialTaskModal, setIsOpenSelectInitialTaskModal] =
    useState(false);

  const generateTaskInfoArr = useCallback(() => {
    const taskInfoArr: TaskInfoForInitialSelection[] = [];
    for (let i = 0; i < tabs.length; i++) {
      const { taskLists } = tabs[i];
      for (let j = 0; j < taskLists.length; j++) {
        const { tasks } = taskLists[j];
        for (let k = 0; k < tasks.length; k++) {
          const taskInfo: TaskInfoForInitialSelection = {
            tabIndex: i,
            listIndex: j,
            taskIndex: k,
            taskName: tasks[k].name,
          };
          taskInfoArr.push(taskInfo);
        }
      }
    }
    return taskInfoArr;
  }, [tabs]);

  const onOpenSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(true);
  }, []);

  const onCloseSelectInitialTaskModal = useCallback(() => {
    setIsOpenSelectInitialTaskModal(false);
  }, []);

  return {
    generateTaskInfoArr,
    isOpenSelectInitialTaskModal,
    onOpenSelectInitialTaskModal,
    onCloseSelectInitialTaskModal,
  };
};
