import { useState } from 'react';
import { useRouter } from 'next/router';
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
  DeleteTabConfirmModal,
  useDeleteTabConfirmModal,
} from '../../../features/workSession';

import { LoadingOverlay, MobileMenu, Navbar } from '../../elements/common';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectCurrentSelectedTab,
  updateSelectedTab,
} from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { Tab } from '../../../types/entity';
import {
  CreateTabParams,
  SelectInitialTaskFormValues,
} from '../../../features/workSession/types';

import { showToast } from '../../../libs/react-toastify/toast';
import { useRDKUpdateWorkSessionState } from '../../../features/workSession/hooks/useRDK/useRDKUpdateWorkSessionState';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { getWebRoute } from '../../../routes/web';
import { useCreateTab } from '../../../features/workSession/api/hooks/tab/useCreateTab';
import { selectWorkSessionState } from '../../../stores/slices/workSessionSlice';
import { useUpdateTab } from '../../../features/workSession/api/hooks/tab/useUpdateTab';
import { useDeleteTab } from '../../../features/workSession/api/hooks/tab/useDeleteTab';

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
  const router = useRouter();

  const user = useAppSelector(selectLoggedInUser);
  if (!user) router.push(getWebRoute('login'));

  const authToken = getUserLoginCookie();

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);

  // RDK related
  const { handleUpdateActiveTask } = useRDKUpdateActiveTask();
  const { handleUpdateIsWorkSessionActive, handleUpdateWorkSessionId } =
    useRDKUpdateWorkSessionState();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);
  const { workSessionId, isWorkSessionActive } = useAppSelector(
    selectWorkSessionState,
  );

  const dispatch = useAppDispatch();

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

  const {
    isOpenDeleteTabConfirmModal,
    onOpenDeleteTabConfirmModal,
    onCloseDeleteTabConfirmModal,
  } = useDeleteTabConfirmModal();

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

  const {
    refetch: getLatestWorkSession,
    isLoading: isLoadingGetLatestWorkSession,
  } = useGetLatestWorkSession(
    { authToken, userId: user?.id },
    {
      enabled: user !== undefined,
      // enabled: false,
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

  const { mutate: createTab } = useCreateTab({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on starting a session.');
    },
  });

  const { mutate: updateTab } = useUpdateTab({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on updating tab');
    },
  });

  const { mutate: deleteTab } = useDeleteTab({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on updating tab');
    },
  });

  const selectableTaskInfos = generateTaskInfoArr(tabs);

  // data post & close the modal.
  const startWorkSession = async (values: SelectInitialTaskFormValues) => {
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
  };

  // on creating a new tab
  const handleCreateNewTab = async () => {
    if (isWorkSessionActive) {
      const createTabParams: CreateTabParams = {
        workSessionId,
        name: 'New tab',
        displayOrder: tabs.length + 1,
      };
      await createTab(createTabParams);
    } else {
      const newTab: Tab = {
        id: tabs[tabs.length - 1].id + 1,
        name: 'New tab',
        displayOrder: tabs.length + 1,
        lists: [],
      };
      setTabs((tabs) => [...tabs, newTab]);
      dispatch(updateSelectedTab(newTab));
    }
  };

  // on renaming a tab
  const onRenameTab = async (newTabName: string) => {
    if (isWorkSessionActive) {
      await updateTab({
        workSessionId,
        tabId: selectedTab.id,
        attr: { name: newTabName },
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetIndex = prevTabs.findIndex(
          (tab) => tab.id === selectedTab.id,
        );
        prevTabs.forEach((tab, index) => {
          if (index === targetIndex) {
            newTabs.push({ ...tab, name: newTabName });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const onDeleteTab = async () => {
    if (isWorkSessionActive) {
      await deleteTab({
        workSessionId,
        tabId: selectedTab.id,
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetIndex = prevTabs.findIndex(
          (tab) => tab.id === selectedTab.id,
        );
        prevTabs.forEach((tab, index) => {
          if (index !== targetIndex) {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

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
      <DeleteTabConfirmModal
        isOpen={isOpenDeleteTabConfirmModal}
        onCloseModal={onCloseDeleteTabConfirmModal}
        handleYesButtonOnClick={onDeleteTab}
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
        <TabsArea
          tabs={tabs}
          onRenameTab={onRenameTab}
          onDeleteTab={onOpenDeleteTabConfirmModal}
          handleCreateNewTab={handleCreateNewTab}
        />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
