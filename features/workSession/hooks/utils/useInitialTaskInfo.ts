import { useCallback } from 'react';

import { TaskInfoForInitialSelection } from '../../types';
import { Tab } from '../../../../types/entity';

export const useInitialTaskInfo = () => {
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

  const newTabsWithInitialTaskActivated = useCallback(
    (
      tabs: Tab[],
      tabIndex: number,
      listIndex: number,
      taskIndex: number,
    ): Tab[] => {
      const newTabs = [];
      tabs.forEach((tab, i) => {
        const newTab = { ...tab, lists: [] };
        tab.lists.forEach((list, j) => {
          const newList = { ...list, tasks: [] };
          list.tasks.forEach((task, k) => {
            if (i === tabIndex && j === listIndex && k === taskIndex) {
              const activatedTask = { ...task, isActive: true };
              newList.tasks.push(activatedTask);
            } else {
              newList.tasks.push(task);
            }
          });
          newTab.lists.push(newList);
        });
        newTabs.push(newTab);
      });
      return newTabs;
    },
    [],
  );

  return { generateTaskInfoArr, newTabsWithInitialTaskActivated };
};
