import { useCallback } from 'react';
import {
  updateIsWorkSessionActive,
  updateWorkSessionId,
} from '../../../../stores/slices/workSessionSlice';
import { useAppDispatch } from '../../../../stores/hooks';

export const useRTKUpdateWorkSessionState = () => {
  const dispatch = useAppDispatch();
  const handleUpdateWorkSessionId = useCallback(
    (workSessionId) => {
      dispatch(updateWorkSessionId(workSessionId));
    },
    [dispatch],
  );

  const handleUpdateIsWorkSessionActive = useCallback(
    (isWorkSessionActive: boolean) => {
      dispatch(updateIsWorkSessionActive(isWorkSessionActive));
    },
    [dispatch],
  );
  return { handleUpdateWorkSessionId, handleUpdateIsWorkSessionActive };
};
