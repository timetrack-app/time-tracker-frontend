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
import { selectIsWorkSessionActive } from '../../../stores/slices/workSessionSlice';
import { updateActiveTask } from '../../../stores/slices/activeTaskSlice';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { useElapsedTimeCalc } from '../../../hooks/useElapsedTimeCalc';
import { Tab } from '../../../types/entity';
import { useSelectInitialTaskModal } from '../../../features/workSession/hooks/useSelectInitialTaskModal';
import { SelectInitialTaskFormValues } from '../../../features/workSession/types';

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
  const {
    generateTaskInfoArr,
    isOpenSelectInitialTaskModal,
    onOpenSelectInitialTaskModal,
    onCloseSelectInitialTaskModal,
  } = useSelectInitialTaskModal(tabs);
  // TODO: Check if this method works or not...
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = isFetching > 0 || isMutating > 0;

  const dispatch = useAppDispatch();
  const isWorkSessionActive = useAppSelector(selectIsWorkSessionActive);
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  const { mutate: createWorkSession } = useCreateWorkSession();
  // temporary solution
  const fakeUserId = 1;

  const { calcTotalTimeSec, calcTotalTimeSecOfATab } = useElapsedTimeCalc();

  // TODO: Temporary solution. Fix this later
  useEffect(() => {
    if (isWorkSessionActive) {
      dispatch(
        updateActiveTask({
          tabId: tabs[0].id,
          listId: tabs[0].taskLists[0].id,
          id: tabs[0].taskLists[0].tasks[0].id,
          name: tabs[0].taskLists[0].tasks[0].name,
          elapsedSeconds: tabs[0].taskLists[0].tasks[0].totalTime,
          isTimerRunning: true,
        }),
      );
    }
  }, [isWorkSessionActive]);

  const selectableTaskInfos = generateTaskInfoArr();

  // data post & close the modal.
  const startWorkSession = useCallback(
    async (values: SelectInitialTaskFormValues) => {
      // Get the initial task info with the index
      const initialTaskInfo = selectableTaskInfos[values.taskInfoIndex];
      // Set the active task state in client side
      setTabs((prevTabs) => {
        const newTabs = [...prevTabs];
        const { tabIndex, listIndex, taskIndex } = initialTaskInfo;
        newTabs[tabIndex].taskLists[listIndex].tasks[taskIndex].isActive = true;
        return newTabs;
      });
      // API call
      await createWorkSession({ tabs, userId: fakeUserId });
      // Close the modal
      onCloseSelectInitialTaskModal();
    },
    [
      createWorkSession,
      onCloseSelectInitialTaskModal,
      selectableTaskInfos,
      tabs,
    ],
  );

  return (
    <>
      <LoadingOverlay loading={isLoading} />
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
