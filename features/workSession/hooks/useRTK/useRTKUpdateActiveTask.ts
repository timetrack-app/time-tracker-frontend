import { useCallback } from 'react';
import { useAppDispatch } from '../../../../stores/hooks';
import { updateActiveTask } from '../../../../stores/slices/activeTaskSlice';
import { Tab, Task, TaskList } from '../../../../types/entity';
import { updateIsWorkSessionActive } from '../../../../stores/slices/workSessionSlice';

export const useRTKUpdateActiveTask = () => {
  const dispatch = useAppDispatch();

  const handleUpdateActiveTaskState = useCallback(
    (activeTab: Tab, activeList: TaskList, activeTask: Task) => {
      dispatch(
        updateActiveTask({
          tabId: activeTab.id,
          listId: activeList.id,
          id: activeTask.id,
          name: activeTask.name,
          totalTime: activeTask.totalTime,
          isTimerRunning: true,
        }),
      );
      dispatch(updateIsWorkSessionActive(true));
    },
    [dispatch],
  );

  return { handleUpdateActiveTaskState };
};
