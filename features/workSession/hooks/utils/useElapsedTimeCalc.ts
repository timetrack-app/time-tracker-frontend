import { useCallback } from 'react';
import { useAppSelector } from '../../../../stores/hooks';
import { selectActiveTask } from '../../../../stores/slices/activeTaskSlice';
import { Tab, TaskList, Task } from '../../../../types/entity';

/**
 * Custom hook for calculate elapsed time of tasks
 *
 * @return {*}
 */
export const useElapsedTimeCalc = () => {
  const activeTask = useAppSelector(selectActiveTask);

  /**
   *
   *
   * @param {TaskList[]} lists
   * @return {Task[]}
   */
  const extractTasksFromlists = (lists: TaskList[]): Task[] => {
    if (!lists.length) return [];

    let tasks: Task[] = [];

    for (let list of lists) {
      if (list.tasks.length) {
        tasks = tasks.concat(list.tasks);
      }
    }

    return tasks;
  };

  /**
   *
   *
   * @param {Task[]} tasks
   * @param {boolean} [ignoreActive=false] true if not include total time of active task
   * @return {number}  total seconds
   */
  const sumTaskTotalSec = (tasks: Task[], ignoreActive = false): number => {
    let totalTimeSec = 0;
    if (!tasks.length) return totalTimeSec;

    for (let task of tasks) {
      if (ignoreActive && task.id === activeTask.id) {
        continue;
      }
      totalTimeSec += task.totalTime;
    }

    return totalTimeSec;
  };

  /**
   *
   *
   * @param {Tab[]} tabs
   * @return {number}
   */
  const calcNonActiveTaskTotalSec = useCallback(
    (tabs: Tab[]): number => {
      if (!tabs.length) return 0;

      let taskListQueue: TaskList[] = [];

      // extract lists from tabs
      for (let tab of tabs) {
        if (tab.lists.length) {
          taskListQueue = taskListQueue.concat(tab.lists);
        }
      }

      return sumTaskTotalSec(extractTasksFromlists(taskListQueue), true);
    },
    [sumTaskTotalSec],
  );

  /**
   * Total seconds of all tasks
   *
   * @param {Tab[]} tabs
   * @return {number}
   */
  const calcTotalTimeSec = useCallback(
    (tabs: Tab[]): number => {
      return calcNonActiveTaskTotalSec(tabs) + activeTask.elapsedSeconds;
    },
    [calcNonActiveTaskTotalSec, activeTask],
  );

  /**
   *
   *
   * @param {Tab[]} tabs
   * @param {number} tabId
   * @return {number}
   */
  const calcNonActiveTaskTotalSecOfATab = (
    tabs: Tab[],
    tabId: number,
  ): number => {
    if (!tabs.length) return 0;

    const tab = tabs.find((tab) => tab.id === tabId);
    if (!tab || !tab.lists.length) return 0;

    return sumTaskTotalSec(extractTasksFromlists(tab.lists), true);
  };

  /**
   * Total seconds of a specific tab
   *
   * @param {Tab[]} tabs
   * @param {number} tabId
   * @return {number}
   */
  const calcTotalTimeSecOfATab = useCallback(
    (tabs: Tab[], tabId: number): number => {
      const nonActiveTaskTotal = calcNonActiveTaskTotalSecOfATab(tabs, tabId);

      return activeTask.tabId === tabId
        ? nonActiveTaskTotal + activeTask.elapsedSeconds
        : nonActiveTaskTotal;
    },
    [calcNonActiveTaskTotalSecOfATab, activeTask],
  );

  return {
    calcTotalTimeSec,
    calcTotalTimeSecOfATab,
  } as const;
};
