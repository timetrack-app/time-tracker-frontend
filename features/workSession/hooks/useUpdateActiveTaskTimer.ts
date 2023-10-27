import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectActiveTask,
  incrementElapsedSeconds,
} from '../../../stores/slices/activeTaskSlice';

/**
 * Custom hook for updating elapsedSeconds of the activeTask
 *
 */
export const useUpdateActiveTaskTimer = () => {
  const dispatch = useAppDispatch();
  const { isTimerRunning } = useAppSelector(selectActiveTask);

  let intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalIdRef.current = setInterval(() => {
        // update elapsedTime every 1 sec
        dispatch(incrementElapsedSeconds());
      }, 1000);
    } else if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [dispatch, isTimerRunning]);
};
