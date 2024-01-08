import { LocalStoredTimerCountData } from '../../types';

export const useLocalStoredTimerCountData = () => {
  const key = 'localStoredTimerCountData';
  const getLocalStoredTimerCount = (): LocalStoredTimerCountData => {
    const localStoredTimerCountData: LocalStoredTimerCountData = JSON.parse(
      localStorage.getItem(key),
    );
    return localStoredTimerCountData;
  };

  const setLocalStoredTimerCount = (
    taskId: number,
    totalTime: number,
  ): void => {
    // Logic to calculate the startedDate. It is the current time minus the totalTime
    const currentTimeInMilliseconds = new Date().getTime();
    const totalTimeInMilliseconds = totalTime * 1000;
    const startedDate = new Date(
      currentTimeInMilliseconds - totalTimeInMilliseconds,
    ).toISOString();
    const localStoredTimerCountData: LocalStoredTimerCountData = {
      taskId: taskId.toString(),
      startedDate,
    };
    localStorage.setItem(key, JSON.stringify(localStoredTimerCountData));
  };

  return { getLocalStoredTimerCount, setLocalStoredTimerCount };
};
