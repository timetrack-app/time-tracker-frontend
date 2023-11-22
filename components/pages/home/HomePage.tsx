import { useCallback, useState } from 'react';
import styled from 'styled-components';

import {
  SelectInitialTaskModal,
  useSelectInitialTaskModal,
  useRDKUpdateActiveTask,
  useGetLatestWorkSession,
  useCreateWorkSession,
  useInitialTaskInfo,
  useElapsedTimeCalc,
  OnGoingTimerArea,
  TabsArea,
} from '../../../features/workSession';

import { LoadingOverlay, MobileMenu, Navbar } from '../../elements/common';

import { useAppSelector } from '../../../stores/hooks';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { Tab } from '../../../types/entity';
import { SelectInitialTaskFormValues } from '../../../features/workSession/types';

import { showToast } from '../../../libs/react-toastify/toast';
import { useRDKUpdateWorkSessionState } from '../../../features/workSession/hooks/useRDK/useRDKUpdateWorkSessionState';

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
  const { handleUpdateActiveTask } = useRDKUpdateActiveTask();
  const { handleUpdateIsWorkSessionActive, handleUpdateWorkSessionId } =
    useRDKUpdateWorkSessionState();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);
  // temporary solution
  const fakeUserId = 1;

  // Utility hooks
  const { calcTotalTimeSec, calcTotalTimeSecOfATab } = useElapsedTimeCalc();
  const { generateTaskInfoArr, newTabsWithInitialTaskActivated } =
    useInitialTaskInfo();

  // Modal
  const {
    isOpenSelectInitialTaskModal,
    onOpenSelectInitialTaskModal,
    onCloseSelectInitialTaskModal,
  } = useSelectInitialTaskModal();

  // API call related
  const { mutate: createWorkSession, isLoading: isLoadingCreateWorkSession } =
    useCreateWorkSession({
      onSuccess: (data) => {
        const { id, tabs, activeTab, activeList, activeTask } =
          data.workSession;
        handleUpdateWorkSessionId(id);
        handleUpdateIsWorkSessionActive(true);
        handleUpdateActiveTask(activeTab, activeList, activeTask);
        setTabs(tabs);
      },
      onError: (err) => {
        console.error(err);
        showToast('error', 'An error has occurred on starting a session.');
      },
    });

  const { isLoading: isLoadingGetLatestWorkSession } = useGetLatestWorkSession(
    { userId: fakeUserId },
    {
      onSuccess: (data) => {
        const { id, tabs, activeTab, activeList, activeTask } =
          data.workSession;
        handleUpdateWorkSessionId(id);
        handleUpdateIsWorkSessionActive(true);
        handleUpdateActiveTask(activeTab, activeList, activeTask);
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
      const { tabIndex, listIndex, taskIndex } = initialTaskInfo;

      // create new tab array with the initial task to be active
      const newTabs = newTabsWithInitialTaskActivated(
        tabs,
        tabIndex,
        listIndex,
        taskIndex,
      );
      // API call
      await createWorkSession({ tabs: newTabs, userId: fakeUserId });
      // Close the modal
      onCloseSelectInitialTaskModal();
    },
    [
      createWorkSession,
      newTabsWithInitialTaskActivated,
      onCloseSelectInitialTaskModal,
      selectableTaskInfos,
      tabs,
    ],
  );

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
