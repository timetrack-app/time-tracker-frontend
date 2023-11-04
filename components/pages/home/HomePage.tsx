import { useCallback, useEffect, useState } from 'react';
import { useIsFetching, useIsMutating } from 'react-query';
import styled from 'styled-components';

import OnGoingTimerArea from '../../../features/workSession/components/elements/OnGoingTimerArea/OnGoingTimerArea';
import TabsArea from '../../../features/workSession/components/elements/TabArea/TabsArea';
import LoadingOverlay from '../../elements/common/LoadingOverlay/LoadingOverlay';
import MobileMenu from '../../elements/common/MobileMenu/MobileMenu';
import Navbar from '../../elements/Navbar/Navbar';
import { useCreateWorkSession } from '../../../features/workSession/api/hooks/useCreateWorkSession';
import SelectInitialTaskModal from '../../../features/workSession/components/elements/modals/SelectInitialTaskModal/SelectInitialTaskModal';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectIsWorkSessionActive,
  updateIsWorkSessionActive,
} from '../../../stores/slices/workSessionSlice';
import { updateActiveTask } from '../../../stores/slices/activeTaskSlice';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { useElapsedTimeCalc } from '../../../features/workSession/hooks/utils/useElapsedTimeCalc';
import { Tab, Task } from '../../../types/entity';
import { useSelectInitialTaskModal } from '../../../features/workSession/hooks/modal/useSelectInitialTaskModal';
import { SelectInitialTaskFormValues } from '../../../features/workSession/types';
import { useGetLatestWorkSession } from '../../../features/workSession/api/hooks/useGetLatestWorkSession';
import { useInitialTaskInfo } from '../../../features/workSession/hooks/utils/useInitialTaskInfo';
import { set } from 'react-hook-form';
import { log } from 'console';

const MainAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 100vh;
  min-height: 100vh;
  gap: 24px;
  padding: 2em 1.5em 1.5em;

  @media ${breakPoint.tablet} {
    min-height: auto;
    flex-direction: row;
    align-items: normal;
    padding-inline: 24px;
    padding-bottom: 24px;
  }
`;

const HomePage = () => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);

  // RDK related
  const dispatch = useAppDispatch();
  const isWorkSessionActive = useAppSelector(selectIsWorkSessionActive);
  const selectedTab = useAppSelector(selectCurrentSelectedTab);
  // temporary solution
  const fakeUserId = 1;

  // Utility hooks
  const { calcTotalTimeSec, calcTotalTimeSecOfATab } = useElapsedTimeCalc();
  const { selectedTaskInfo, setSelectedTaskInfo, generateTaskInfoArr } =
    useInitialTaskInfo();

  // Modal
  const {
    isOpenSelectInitialTaskModal,
    onOpenSelectInitialTaskModal,
    onCloseSelectInitialTaskModal,
  } = useSelectInitialTaskModal();

  // API call related
  // const isFetching = useIsFetching();
  // const isMutating = useIsMutating();
  // const isLoading = isFetching > 0 || isMutating > 0;

  const { mutate: createWorkSession, isLoading: isLoadingCreateWorkSession } =
    useCreateWorkSession({
      onSuccess: (data) => {
        const { tabs } = data.workSession;
        // attach id to the tabs,list,tasks
        setTabs(tabs);
        const { tabIndex, listIndex, taskIndex, taskName } = selectedTaskInfo;

        dispatch(
          updateActiveTask({
            tabId: tabs[tabIndex].id,
            listId: tabs[tabIndex].lists[listIndex].id,
            id: tabs[tabIndex].lists[listIndex].tasks[taskIndex].id,
            name: taskName,
            elapsedSeconds:
              tabs[tabIndex].lists[listIndex].tasks[taskIndex].totalTime,
            isTimerRunning: true,
          }),
        );
        dispatch(updateIsWorkSessionActive(true));
      },
      onError: (err) => {
        // TODO: handle error
        console.error(err);
      },
    });

  const {
    refetch: getLatestWorkSession,
    isLoading: isLoadingGetLatestWorkSession,
  } = useGetLatestWorkSession(
    { userId: fakeUserId },

    {
      // prevent automatic refetching
      enabled: false,
      onSuccess: (data) => {
        const { tabs } = data.workSession;
        setTabs(tabs);
      },
      onError: (err) => {
        console.error(err);
      },
    },
  );

  const selectableTaskInfos = generateTaskInfoArr(tabs);

  // data post & close the modal.
  const startWorkSession = useCallback(
    async (values: SelectInitialTaskFormValues) => {
      // Get the initial task info with the index
      const initialTaskInfo = selectableTaskInfos[values.taskInfoIndex];
      setSelectedTaskInfo(initialTaskInfo);
      const { tabIndex, listIndex, taskIndex } = initialTaskInfo;

      // set the initial task to active
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

      // API call
      await createWorkSession({ tabs: newTabs, userId: fakeUserId });
      // Close the modal
      onCloseSelectInitialTaskModal();
    },
    [
      createWorkSession,
      onCloseSelectInitialTaskModal,
      selectableTaskInfos,
      setSelectedTaskInfo,
      tabs,
    ],
  );

  // Get the latest work session when the work session is active
  // TODO : Doesn't works on reload, since isWorkSessionActive is false
  useEffect(() => {
    if (isWorkSessionActive) {
      getLatestWorkSession();
    }
  }, [getLatestWorkSession, isWorkSessionActive]);

  return (
    <>
      <LoadingOverlay
        loading={isLoadingCreateWorkSession || isLoadingGetLatestWorkSession}
      />
      <Navbar />
      <MobileMenu />
      <SelectInitialTaskModal
        isOpen={isOpenSelectInitialTaskModal}
        selectableTaskInfos={selectableTaskInfos}
        onClose={onCloseSelectInitialTaskModal}
        startWorkSession={startWorkSession}
      />
      <MainAreaContainer>
        <OnGoingTimerArea
          totalTimeSec={calcTotalTimeSec(tabs)}
          totalTimeSecInSelectedTab={calcTotalTimeSecOfATab(
            tabs,
            selectedTab.id,
          )}
          onClickStartSession={onOpenSelectInitialTaskModal}
        />
        <TabsArea tabs={tabs} />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
