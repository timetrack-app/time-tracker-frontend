import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectActiveTask,
  incrementElapsedSeconds,
  updateElapsedSeconds,
} from '../../../stores/slices/activeTaskSlice';

/**
 * Custom hook for updating elapsedSeconds of the activeTask
 *
 */
export const useUpdateActiveTaskTimer = () => {
  const dispatch = useAppDispatch();
  const { isTimerRunning, id, elapsedSeconds } =
    useAppSelector(selectActiveTask);

  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      // if there is stored elapsedSeconds in localStorage, update the timer with it
      const localStoredElapsedSeconds = localStorage.getItem(id.toString());
      if (localStoredElapsedSeconds) {
        dispatch(updateElapsedSeconds(parseInt(localStoredElapsedSeconds)));
      }
      intervalIdRef.current = setInterval(() => {
        // update elapsedTime every 1 sec
        dispatch(incrementElapsedSeconds());
        // update localStorage every 1 sec
        localStorage.setItem(id.toString(), (elapsedSeconds + 1).toString());
      }, 1000);
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [dispatch, elapsedSeconds, id, isTimerRunning]);
};
