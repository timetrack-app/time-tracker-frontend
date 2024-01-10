import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import {
  selectActiveTask,
  updateElapsedSeconds,
} from '../../../../stores/slices/activeTaskSlice';
import { useLocalStoredTimerCountData } from './useLocalStoredTimerCountData';
import { selectWorkSessionState } from '../../../../stores/slices/workSessionSlice';

/**
 * Custom hook for updating totalTime of the activeTask
 *
 */
export const useUpdateActiveTaskTimer = () => {
  const dispatch = useAppDispatch();
  const { id, totalTime } = useAppSelector(selectActiveTask);
  const { isWorkSessionActive } = useAppSelector(selectWorkSessionState);
  const { getLocalStoredTimerCount, setLocalStoredTimerCount } =
    useLocalStoredTimerCountData();

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isWorkSessionActive) {
      intervalIdRef.current = setInterval(() => {
        const localStoredTimerCountData = getLocalStoredTimerCount();
        // when there's no data in local storage or the data is not for the current task
        if (
          !localStoredTimerCountData ||
          localStoredTimerCountData.taskId !== id.toString()
        ) {
          setLocalStoredTimerCount(id, totalTime);
        } else {
          const { startedDate } = localStoredTimerCountData;
          const dateDiff =
            new Date().getTime() - new Date(startedDate).getTime();
          const totalTimeDiff = Math.floor(dateDiff / 1000);
          dispatch(updateElapsedSeconds(totalTimeDiff));
        }
      }, 1000);
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [
    dispatch,
    totalTime,
    getLocalStoredTimerCount,
    id,
    isWorkSessionActive,
    setLocalStoredTimerCount,
  ]);
};
