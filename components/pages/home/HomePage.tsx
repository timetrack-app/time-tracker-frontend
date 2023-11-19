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
} from '../../../features/workSession/index';

import {
  LoadingOverlay,
  MobileMenu,
  Navbar,
} from '../../elements/common/index';

import { useAppSelector } from '../../../stores/hooks';
import { selectCurrentSelectedTab } from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { Tab } from '../../../types/entity';
import { SelectInitialTaskFormValues } from '../../../features/workSession/types';

import { showToast } from '../../../libs/react-toastify/toast';
import { useRDKUpdateWorkSessionState } from '../../../features/workSession/hooks/useRDK/useRDKUpdateWorkSessionState';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { useAnyTrue } from '../../../hooks/useAnyTrue';

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

/**
 * Main page with:
 * main timer, sub section(with timer), tabs, lists, tasks
 *
 * A user can start a work session, add tabs, lists and tasks
 *
 * @return {JSX.Element}
 */
const HomePage = () => {
  const user = useAppSelector(selectLoggedInUser);

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);

  // RDK related
  const { handleUpdateActiveTask } = useRDKUpdateActiveTask();
  const { handleUpdateIsWorkSessionActive, handleUpdateWorkSessionId } =
    useRDKUpdateWorkSessionState();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

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
    { userId: user?.id },
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
      await createWorkSession({ tabs: newTabs, userId: user?.id });
      // Close the modal
      onCloseSelectInitialTaskModal();
    },
    [
      createWorkSession,
      newTabsWithInitialTaskActivated,
      onCloseSelectInitialTaskModal,
      selectableTaskInfos,
      tabs,
      user?.id,
    ],
  );

  const isLoading = useAnyTrue([
    isLoadingCreateWorkSession,
    isLoadingGetLatestWorkSession,
  ]);

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
