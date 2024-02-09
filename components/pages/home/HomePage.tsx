import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

// components
import {
  TabArea,
  OnGoingTimerArea,
  DeleteTabConfirmModal,
} from '../../../features/workSession/components';

import {
  useCreateTab,
  useUpdateTab,
  useDeleteTab,
  useCreateList,
  useUpdateList,
  useDeleteList,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useSwitchActiveTask,
  useGetWorkSessionsByUserId,
} from '../../../features/workSession/api';
import { LoadingOverlay, MobileMenu, Navbar } from '../../elements/common';

import { useAppDispatch, useAppSelector } from '../../../stores/hooks';
import {
  selectCurrentSelectedTab,
  updateSelectedTab,
} from '../../../stores/slices/selectedTabSlice';
import {
  updateActiveTask,
  selectActiveTask,
} from '../../../stores/slices/activeTaskSlice';

import { breakPoint } from '../../../const/styles/breakPoint';
import { Tab, TaskList } from '../../../types/entity';
import { CreateTabParams } from '../../../features/workSession/types';

import { showToast } from '../../../libs/react-toastify/toast';
import { useRTKUpdateWorkSessionState } from '../../../features/workSession/hooks/useRTK/useRTKUpdateWorkSessionState';
import { selectLoggedInUser } from '../../../stores/slices/authSlice';
import { useAnyTrue } from '../../../hooks/useAnyTrue';
import { getUserLoginCookie } from '../../../utils/cookie/auth';
import { getWebRoute } from '../../../routes/web';

import { selectWorkSessionState } from '../../../stores/slices/workSessionSlice';

import { useModal } from '../../elements/common/Modal/Modal';

const MainAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  padding-inline: 24px;
  padding-block: 12px;

  @media ${breakPoint.tablet} {
    height: calc(100vh - 94px);
    flex-direction: row;
    align-items: normal;
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

  const [tabs, setTabs] = useState<Tab[]>([]);

  // Global state related
  const { handleUpdateWorkSessionId } = useRTKUpdateWorkSessionState();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);
  const { workSessionId, isWorkSessionActive } = useAppSelector(
    selectWorkSessionState,
  );

  const { tabId } = useAppSelector(selectActiveTask);

  const dispatch = useAppDispatch();

  // Modal hooks
  const {
    isOpen: isOpenDeleteTabConfirmModal,
    onOpen: onOpenDeleteTabConfirmModal,
    onClose: onCloseDeleteTabConfirmModal,
  } = useModal();

  // API call related
  const {
    refetch: getWorkSessionsByUserId,
    isLoading: isLoadingGetWorkSessionsByUserId,
  } = useGetWorkSessionsByUserId(
    { authToken, userId: user?.id },
    {
      enabled: user !== undefined,
      onSuccess: (data) => {
        const workSession = data.workSessions[0];
        const {
          id,
          tabs: fetchedTabs,
          activeTab,
          activeList,
          activeTask,
        } = workSession;
        handleUpdateWorkSessionId(id);
        dispatch(
          updateActiveTask({
            name: activeTask ? activeTask.name : '',
            totalTime: activeTask ? activeTask.totalTime : 0,
            isTimerRunning: !!activeTask,
            tabId: activeTab ? id : null,
            listId: activeList ? id : null,
            id: activeTask ? activeTask.id : null,
          }),
        );

        // if the tabs state is initial state, set tab state to the first tab
        // TODO : maybe better to store selected tab in local storage
        if (selectedTab.id === 0) {
          dispatch(updateSelectedTab(fetchedTabs[0]));
        }
        setTabs(fetchedTabs);
      },
      onError: () => {
        showToast('error', 'An error has occurred on fetching work session.');
      },
    },
  );

  const { mutate: switchActiveTask } = useSwitchActiveTask({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on updating active task.');
    },
  });

  // const { mutate: endWorkSession } = useEndWorkSession();

  const { mutate: createTab } = useCreateTab({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on creating a tab.');
    },
  });

  const { mutate: updateTab } = useUpdateTab({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on updating tab');
    },
  });

  const { mutate: deleteTab } = useDeleteTab({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on deleting tab');
    },
  });

  const { mutate: createList } = useCreateList({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on creating a list.');
    },
  });

  const { mutate: updateList } = useUpdateList({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on updating list');
    },
  });

  const { mutate: deleteList } = useDeleteList({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on deleting list');
    },
  });

  const { mutate: createTask } = useCreateTask({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on creating a task.');
    },
  });

  const { mutate: updateTask } = useUpdateTask({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on updating task');
    },
  });

  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      getWorkSessionsByUserId();
    },
    onError: () => {
      showToast('error', 'An error has occurred on deleting task');
    },
  });

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
      if (tabId === selectedTab.id) {
        return showToast(
          'error',
          'Failed to delete this tab because it contains the active task.',
        );
      }
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
    // when the task name is empty, set it to 'Untitled'
    if (taskName === '') taskName = 'Untitled';

    if (isWorkSessionActive) {
      // Find the list to add a new task to from the tab state
      const targetList = tabs
        .find((tab) => tab.id === tabId)
        ?.lists.find((list) => list.id === listId);
      const displayOrder =
        targetList.tasks.length > 0 ? targetList.tasks.length + 1 : 1;
      await createTask({
        authToken,
        workSessionId,
        tabId,
        listId,
        description,
        displayOrder,
        name: taskName,
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
                    displayOrder:
                      list.tasks.length > 0 ? list.tasks.length + 1 : 1,
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

  const handleStartNewTask = async (
    currentActiveTaskInfo: {
      tabId: number;
      listId: number;
      taskId: number;
    },
    newTaskInfo: {
      tabId: number;
      listId: number;
      taskId: number;
    },
    currentTaskTotalTime: number,
  ) => {
    if (currentActiveTaskInfo.taskId === newTaskInfo.taskId) return;
    if (currentActiveTaskInfo.taskId) {
      // Save the current active task total time in DB
      await updateTask({
        authToken,
        workSessionId,
        attr: { totalTime: currentTaskTotalTime },
        ...currentActiveTaskInfo,
      });
    }
    // Update the active task
    await switchActiveTask({
      authToken,
      userId: user?.id,
      workSessionId,
      activeTabId: newTaskInfo.tabId,
      activeListId: newTaskInfo.listId,
      activeTaskId: newTaskInfo.taskId,
    });
  };

  const isLoading = useAnyTrue([isLoadingGetWorkSessionsByUserId]);

  return (
    <>
      <LoadingOverlay loading={isLoading} />
      <Navbar />
      <MobileMenu />
      <DeleteTabConfirmModal
        isOpen={isOpenDeleteTabConfirmModal}
        onCloseModal={onCloseDeleteTabConfirmModal}
        handleYesButtonOnClick={handleDeleteTab}
      />
      <MainAreaContainer>
        <OnGoingTimerArea
          totalTimeSec={0}
          totalTimeSecInSelectedTab={0}
          onClickStartSession={() => {}}
          onOpenEndWorkSessionConfirmModal={() => {}}
        />
        {tabs.length && (
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
            handleStartNewTask={handleStartNewTask}
          />
        )}
      </MainAreaContainer>
    </>
  );
};

export default HomePage;
