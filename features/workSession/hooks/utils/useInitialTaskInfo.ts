import { useCallback, useState } from 'react';
import { initialDefaultTask } from '../../../../const/initialTabsState';
import { Tab } from '../../../../types/entity';
import { TaskInfoForInitialSelection } from '../../types';

export const useInitialTaskInfo = (tabs: Tab[]) => {
  const [selectedTaskInfo, setSelectedTaskInfo] =
    useState<TaskInfoForInitialSelection>({
      tabIndex: 0,
      listIndex: 0,
      taskIndex: 0,
      taskName: initialDefaultTask.name,
    });
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

  return { generateTaskInfoArr, selectedTaskInfo, setSelectedTaskInfo };
};
