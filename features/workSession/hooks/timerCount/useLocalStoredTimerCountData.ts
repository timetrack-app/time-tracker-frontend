import { LocalStoredTimerCountData } from '../../types';

export const useLocalStoredTimerCountData = () => {
  const key = 'localStoredTimerCountData';
  const getLocalStoredTimerCount = (): LocalStoredTimerCountData => {
    const localStoredTimerCountData: LocalStoredTimerCountData = JSON.parse(
      localStorage.getItem(key),
    );
    return localStoredTimerCountData;
  };

  const setLocalStoredTimerCount = (taskId: number): void => {
    const localStoredTimerCountData: LocalStoredTimerCountData = {
      taskId: taskId.toString(),
      startedDate: new Date().toISOString(),
    };

    localStorage.setItem(key, JSON.stringify(localStoredTimerCountData));
  };

  return { getLocalStoredTimerCount, setLocalStoredTimerCount };
};
