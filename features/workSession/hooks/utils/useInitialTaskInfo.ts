import { useCallback, useState } from 'react';
import { initialDefaultTask } from '../../../../const/initialTabsState';
import { TaskInfoForInitialSelection } from '../../types';
import { Tab } from '../../../../types/entity';

export const useInitialTaskInfo = () => {
  const [selectedTaskInfo, setSelectedTaskInfo] =
    useState<TaskInfoForInitialSelection>({
      tabIndex: 0,
      listIndex: 0,
      taskIndex: 0,
      taskName: initialDefaultTask.name,
    });
  const generateTaskInfoArr = useCallback((tabs: Tab[]) => {
    const taskInfoArr: TaskInfoForInitialSelection[] = [];
    if (tabs)
      for (let i = 0; i < tabs.length; i++) {
        const { lists } = tabs[i];
        for (let j = 0; j < lists.length; j++) {
          const { tasks } = lists[j];
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
  }, []);
  return { generateTaskInfoArr, selectedTaskInfo, setSelectedTaskInfo };
};
