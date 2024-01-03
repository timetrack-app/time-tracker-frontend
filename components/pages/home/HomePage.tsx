import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import {
  useSelectInitialTaskModal,
  useRDKUpdateActiveTask,
  useInitialTaskInfo,
  useElapsedTimeCalc,
  useDeleteTabConfirmModal,
  EndWorkSessionConfirmModal,
} from '../../../features/workSession';

// components
import {
  TabArea,
  OnGoingTimerArea,
} from '../../../features/workSession/components/layouts';
import {
  SelectInitialTaskModal,
  DeleteTabConfirmModal,
} from '../../../features/workSession/components/modals';

import {
  useCreateWorkSession,
  useGetLatestWorkSession,
  useEndWorkSession,
  useCreateTab,
  useUpdateTab,
  useDeleteTab,
  useCreateList,
  useUpdateList,
  useDeleteList,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '../../../features/workSession/api';
import { LoadingOverlay, MobileMenu, Navbar } from '../../elements/common';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectCurrentSelectedTab,
  updateSelectedTab,
} from '../../../stores/slices/selectedTabSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { initialTabs } from '../../../const/initialTabsState';

import { Tab, TaskList } from '../../../types/entity';
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

import {
  selectWorkSessionState,
  updateIsWorkSessionActive,
} from '../../../stores/slices/workSessionSlice';

import { useModal } from '../../elements/common/Modal/Modal';

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

  // End workSession confirm modal
  // TODO : maybe better to create useEndWorkSessionConfirmModal hook
  const { isModalOpen, openModal, closeModal } = useModal();

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
        console.error('error on creating workSession', err);
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

  const { mutate: endWorkSession } = useEndWorkSession();

  const { mutate: createTab } = useCreateTab({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on creating a tab.');
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
      showToast('error', 'An error has occurred on deleting tab');
    },
  });

  const { mutate: createList } = useCreateList({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on creating a list.');
    },
  });

  const { mutate: updateList } = useUpdateList({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on updating list');
    },
  });

  const { mutate: deleteList } = useDeleteList({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on deleting list');
    },
  });

  const { mutate: createTask } = useCreateTask({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on creating a task.');
    },
  });

  const { mutate: updateTask } = useUpdateTask({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on updating task');
    },
  });

  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      getLatestWorkSession();
    },
    onError: (err) => {
      console.error(err);
      showToast('error', 'An error has occurred on deleting task');
    },
  });

  // for initial task selection
  const selectableTaskInfos = generateTaskInfoArr(tabs);

  // data post & close the modal.
  const handleStartWorkSession = async (
    values: SelectInitialTaskFormValues,
  ) => {
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
    await createWorkSession({ authToken, tabs: newTabs, userId: user?.id });
    // Close the modal
    onCloseSelectInitialTaskModal();
  };

  const handleEndWorkSession = async () => {
    await endWorkSession(
      { authToken, userId: user?.id, workSessionId },
      {
        onError: () => {},
        onSuccess: () => {
          dispatch(updateIsWorkSessionActive(false));
          closeModal();
        },
      },
    );
  };

  // on creating a new tab
  const handleCreateNewTab = async () => {
    if (isWorkSessionActive) {
      const createTabParams: CreateTabParams = {
        authToken,
        workSessionId,
        name: 'New tab',
        displayOrder: tabs.length + 1,
      };
      await createTab(createTabParams);
    } else {
      const newTab: Tab = {
        id: tabs.length >= 1 ? tabs[tabs.length - 1].id + 1 : 1,
        name: 'New tab',
        displayOrder: tabs.length > 0 ? tabs.length + 1 : 1,
        lists: [],
      };
      setTabs((tabs) => [...tabs, newTab]);
      dispatch(updateSelectedTab(newTab));
    }
  };

  // on renaming a tab
  const handleRenameTab = async (newTabName: string) => {
    if (isWorkSessionActive) {
      await updateTab({
        authToken,
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

  const handleDeleteTab = async () => {
    if (isWorkSessionActive) {
      await deleteTab({
        authToken,
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
    onCloseDeleteTabConfirmModal();
  };

  const handleCreateNewList = async (tabId: number) => {
    if (isWorkSessionActive) {
      await createList({
        authToken,
        workSessionId,
        tabId,
        name: 'New list',
        displayOrder: selectedTab.lists.length + 1,
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        prevTabs.forEach((tab, index) => {
          if (index === targetIndex) {
            const newLists: TaskList[] = [
              ...tab.lists,
              {
                id:
                  tab.lists.length > 0
                    ? tab.lists[tab.lists.length - 1].id + 1
                    : 1,
                name: 'New list',
                tasks: [],
                displayOrder: tab.lists.length > 0 ? tab.lists.length + 1 : 1,
                tabId: tab.id,
              },
            ];
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const handleRenameList = async (
    newListName: string,
    tabId: number,
    listId: number,
  ) => {
    if (isWorkSessionActive) {
      await updateList({
        authToken,
        workSessionId,
        tabId,
        listId,
        attr: { name: newListName },
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        prevTabs.forEach((tab, index) => {
          if (index === targetTabIndex) {
            const newLists = [];
            const targetListIndex = tab.lists.findIndex(
              (list) => list.id === listId,
            );
            tab.lists.forEach((list, index) => {
              if (index === targetListIndex) {
                newLists.push({ ...list, name: newListName });
              } else {
                newLists.push(list);
              }
            });
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const handleDeleteList = async (tabId: number, listId: number) => {
    if (isWorkSessionActive) {
      await deleteList({
        authToken,
        workSessionId,
        tabId,
        listId,
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        prevTabs.forEach((tab, index) => {
          if (index === targetTabIndex) {
            const newLists = [];
            const targetListIndex = tab.lists.findIndex(
              (list) => list.id === listId,
            );
            tab.lists.forEach((list, index) => {
              if (index !== targetListIndex) {
                newLists.push(list);
              }
            });
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const handleCreateNewTask = async (
    tabId: number,
    listId: number,
    taskName: string,
    description: string,
  ) => {
    if (isWorkSessionActive) {
      await createTask({
        authToken,
        workSessionId,
        tabId,
        listId,
        description,
        name: taskName,
        displayOrder: selectedTab.lists.length + 1,
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        const targetListIndex = prevTabs[targetTabIndex].lists.findIndex(
          (list) => list.id === listId,
        );
        prevTabs.forEach((tab, index) => {
          if (index === targetTabIndex) {
            const newLists = [];
            tab.lists.forEach((list, index) => {
              if (index === targetListIndex) {
                const newTasks = [
                  ...list.tasks,
                  {
                    description,
                    id:
                      list.tasks.length > 0
                        ? list.tasks[list.tasks.length - 1].id + 1
                        : 1,
                    name: taskName,
                    displayOrder: list.tasks.length > 0 ? list.tasks.length : 1,
                    listId: list.id,
                    totalTime: 0,
                  },
                ];
                newLists.push({ ...list, tasks: newTasks });
              } else {
                newLists.push(list);
              }
            });
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const handleRenameTask = async (
    newTaskName: string,
    tabId: number,
    listId: number,
    taskId: number,
  ) => {
    if (isWorkSessionActive) {
      await updateTask({
        authToken,
        workSessionId,
        tabId,
        listId,
        taskId,
        attr: { name: newTaskName },
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        prevTabs.forEach((tab, index) => {
          if (index === targetTabIndex) {
            const newLists = [];
            const targetListIndex = tab.lists.findIndex(
              (list) => list.id === listId,
            );
            tab.lists.forEach((list, index) => {
              if (index === targetListIndex) {
                const newTasks = [];
                const targetTaskIndex = list.tasks.findIndex(
                  (task) => task.id === taskId,
                );
                list.tasks.forEach((task, index) => {
                  if (index === targetTaskIndex) {
                    newTasks.push({ ...task, name: newTaskName });
                  } else {
                    newTasks.push(task);
                  }
                });
                newLists.push({ ...list, tasks: newTasks });
              } else {
                newLists.push(list);
              }
            });
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  const handleDeleteTask = async (
    tabId: number,
    listId: number,
    taskId: number,
  ) => {
    if (isWorkSessionActive) {
      await deleteTask({
        authToken,
        workSessionId,
        tabId,
        listId,
        taskId,
      });
    } else {
      setTabs((prevTabs) => {
        const newTabs = [];
        const targetTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
        prevTabs.forEach((tab, index) => {
          if (index === targetTabIndex) {
            const newLists = [];
            const targetListIndex = tab.lists.findIndex(
              (list) => list.id === listId,
            );
            tab.lists.forEach((list, index) => {
              if (index === targetListIndex) {
                const newTasks = [];
                const targetTaskIndex = list.tasks.findIndex(
                  (task) => task.id === taskId,
                );
                list.tasks.forEach((task, index) => {
                  if (index !== targetTaskIndex) {
                    newTasks.push(task);
                  }
                });
                newLists.push({ ...list, tasks: newTasks });
              } else {
                newLists.push(list);
              }
            });
            newTabs.push({ ...tab, lists: newLists });
          } else {
            newTabs.push(tab);
          }
        });
        return newTabs;
      });
    }
  };

  // TODO: Consider if it's right to continue to put all of the loadin state in here
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
        startWorkSession={handleStartWorkSession}
      />
      <EndWorkSessionConfirmModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleYesButtonOnClick={handleEndWorkSession}
      />
      <DeleteTabConfirmModal
        isOpen={isOpenDeleteTabConfirmModal}
        onCloseModal={onCloseDeleteTabConfirmModal}
        handleYesButtonOnClick={handleDeleteTab}
      />
      <MainAreaContainer>
        <OnGoingTimerArea
          totalTimeSec={calcTotalTimeSec(tabs)}
          totalTimeSecInSelectedTab={calcTotalTimeSecOfATab(
            tabs,
            selectedTab.id,
          )}
          onClickStartSession={onOpenSelectInitialTaskModal}
          onOpenEndWorkSessionConfirmModal={openModal}
        />
        <TabArea
          tabs={tabs}
          handleCreateNewTab={handleCreateNewTab}
          handleRenameTab={handleRenameTab}
          handleDeleteTab={onOpenDeleteTabConfirmModal}
          handleCreateNewList={handleCreateNewList}
          handleRenameList={handleRenameList}
          handleDeleteList={handleDeleteList}
          handleCreateNewTask={handleCreateNewTask}
          handleRenameTask={handleRenameTask}
          handleDeleteTask={handleDeleteTask}
        />
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
