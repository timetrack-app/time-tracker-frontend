import React, { MutableRefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
// types
import { Tab, Task, TaskList } from '../../../../../../types/entity';

// components and components related hooks
import { PlusButton } from '../../../ui';
import StartNewTaskConfirmPopover from './StartNewTaskConfirnPopover';
import EditTaskMenuPopover from './EditTaskMenuPopover';
import RenameTaskModal from './RenameTaskModal/RenameTaskModal';
import DeleteTaskConfirmModal from './DeleteTaskConfirmModal';
import TaskListComponent from './TaskListComponent/TaskListComponent';
import EditListMenuPopover from './EditListMenuPopover';
import RenameListModal from './RenameListModal/RenameListModal';
import DeleteListConfirmModal from './DeleteListConfirmModal';
import {
  useModal,
  usePopover,
} from '../../../../../../components/elements/common';

// stores
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectActiveTask } from '../../../../../../stores/slices/activeTaskSlice';

// libs
import { showToast } from '../../../../../../libs/react-toastify/toast';

const ContainerDiv = styled.div`
  height: 100%;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  background-color: ${({ theme }) => theme.colors.componentBackground};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TaskListContainerDiv = styled.div`
  display: flex;
  padding: 8px;
  max-width: 100%;
  max-height: 100%;
  gap: 12px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PlusButtonContainerDiv = styled.div`
  padding-top: 8px;
`;

type TabComponentProps = {
  tab: Tab;
  handleCreateTaskList: () => void;
  handleRenameList: (
    newListName: string,
    tabId: number,
    listId: number,
  ) => void;
  handleDeleteList: (tabId: number, listId: number) => void;
  handleCreateNewTask: (
    tabId: number,
    listId: number,
    taskName: string,
    description: string,
  ) => Promise<void>;
  handleRenameTask: (
    newTaskName: string,
    tabId: number,
    listId: number,
    taskId: number,
  ) => Promise<void>;
  handleDeleteTask: (
    tabId: number,
    listId: number,
    taskId: number,
  ) => Promise<void>;
  handleStartNewTask: (
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
  ) => Promise<void>;
};

const TabComponent = ({
  tab,
  handleCreateTaskList,
  handleRenameList,
  handleDeleteList,
  handleCreateNewTask,
  handleRenameTask,
  handleDeleteTask,
  handleStartNewTask,
}: TabComponentProps) => {
  const [currentList, setCurrentList] = useState<TaskList | undefined>(
    undefined,
  );
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const { listId: activeListId, id: activeTaskId } =
    useAppSelector(selectActiveTask);
  const { lists } = tab;

  const {
    isOpen: isOpenRenameListModal,
    onOpen: onOpenRenameListModal,
    onClose: onCloseRenameListModal,
  } = useModal();

  const {
    isOpen: isOpenDeleteListConfirmModal,
    onOpen: onOpenDeleteListConfirmModal,
    onClose: onCloseDeleteListConfirmModal,
  } = useModal();

  const {
    isOpen: isOpenRenameTaskModal,
    onOpen: onOpenRenameTaskModal,
    onClose: onCloseRenameTaskModal,
  } = useModal();

  const {
    isOpen: isOpenDeleteTaskConfirmModal,
    onOpen: onOpenDeleteTaskConfirmModal,
    onClose: onCloseDeleteTaskConfirmModal,
  } = useModal();

  const {
    isOpen: isOpenEditListMenuPopover,
    onClose: onCloseEditListMenuPopover,
    onOpen: onOpenEditListMenuPopover,
    triggerPosition: editListMenuPopoverTriggerPosition,
  } = usePopover();

  const {
    isOpen: isOpenStartNewTaskConfirmPopover,
    onOpen: onOpenStartNewTaskConfirmPopover,
    onClose: onCloseStartNewTaskConfirmPopover,
    triggerPosition: startNewTaskConfirmPopoverTriggerPosition,
  } = usePopover();

  const {
    isOpen: isOpenEditTaskMenuPopover,
    onClose: onCloseEditTaskMenuPopover,
    onOpen: onOpenEditTaskMenuPopover,
    triggerPosition: editTaskMenuPopoverTriggerPosition,
  } = usePopover();

  const handleOpenEditListMenuPopover = (
    ref: MutableRefObject<HTMLElement>,
    list: TaskList,
  ) => {
    setCurrentList(list);
    onOpenEditListMenuPopover(ref);
  };

  const onSubmitListRename = (newListName: string) => {
    handleRenameList(newListName, tab.id, currentList.id);
    onCloseRenameListModal();
  };

  const onDeleteList = () => {
    if (activeListId === currentList.id) {
      return showToast(
        'error',
        'Failed to delete this list because it contains the active task.',
      );
    }
    handleDeleteList(tab.id, currentList.id);
    onCloseDeleteListConfirmModal();
  };

  const handleOpenEditTaskMenuPopover = (
    ref: MutableRefObject<HTMLElement>,
    task: Task,
  ) => {
    setCurrentTask(task);
    onOpenEditTaskMenuPopover(ref);
  };

  const onSubmitTaskRename = (newTaskName: string) => {
    handleRenameTask(newTaskName, tab.id, currentTask.listId, currentTask.id);
    onCloseRenameTaskModal();
  };

  const onDeleteTask = () => {
    if (activeTaskId === currentTask.id) {
      return showToast(
        'error',
        'Failed to delete this task because it is the active task.',
      );
    }
    handleDeleteTask(tab.id, currentTask.listId, currentTask.id);
    onCloseDeleteTaskConfirmModal();
  };

  const handleOpenStartNewTaskConfirmPopover = (
    task: Task,
    ref: MutableRefObject<HTMLElement>,
  ) => {
    setCurrentTask(task);
    onOpenStartNewTaskConfirmPopover(ref);
  };

  // Close list popover when list modal is opened
  useEffect(() => {
    if (isOpenRenameListModal) {
      onCloseEditListMenuPopover();
    }
  }, [isOpenRenameListModal, onCloseEditListMenuPopover]);

  // Close task popover when task modal is opened
  useEffect(() => {
    if (isOpenRenameTaskModal) {
      onCloseEditTaskMenuPopover();
    }
  }, [isOpenRenameTaskModal, onCloseEditTaskMenuPopover]);

  return (
    <ContainerDiv>
      <StartNewTaskConfirmPopover
        isOpen={isOpenStartNewTaskConfirmPopover}
        onClose={onCloseStartNewTaskConfirmPopover}
        task={currentTask}
        triggerPosition={startNewTaskConfirmPopoverTriggerPosition}
        handleStartNewTask={handleStartNewTask}
      />
      <EditListMenuPopover
        triggerPosition={editListMenuPopoverTriggerPosition}
        isOpen={isOpenEditListMenuPopover}
        onClose={onCloseEditListMenuPopover}
        onRename={onOpenRenameListModal}
        onDelete={onOpenDeleteListConfirmModal}
      />
      <EditTaskMenuPopover
        isOpen={isOpenEditTaskMenuPopover}
        onClose={onCloseEditTaskMenuPopover}
        triggerPosition={editTaskMenuPopoverTriggerPosition}
        onRename={onOpenRenameTaskModal}
        onDelete={onOpenDeleteTaskConfirmModal}
      />
      <RenameListModal
        isOpen={isOpenRenameListModal}
        onClose={onCloseRenameListModal}
        onSubmit={onSubmitListRename}
        currentListName={currentList ? currentList.name : ''}
      />
      <DeleteListConfirmModal
        isOpen={isOpenDeleteListConfirmModal}
        onCloseModal={onCloseDeleteListConfirmModal}
        handleYesButtonOnClick={onDeleteList}
      />
      <RenameTaskModal
        isOpen={isOpenRenameTaskModal}
        onClose={onCloseRenameTaskModal}
        onSubmit={onSubmitTaskRename}
        currentTaskName={currentTask ? currentTask.name : ''}
      />
      <DeleteTaskConfirmModal
        isOpen={isOpenDeleteTaskConfirmModal}
        onCloseModal={onCloseDeleteTaskConfirmModal}
        handleYesButtonOnClick={onDeleteTask}
      />
      <TaskListContainerDiv>
        {lists.map((taskList) => (
          <TaskListComponent
            key={taskList.id}
            taskList={taskList}
            onOpenMenuPopover={(ref) => {
              handleOpenEditListMenuPopover(ref, taskList);
            }}
            handleOpenStartNewTaskConfirmPopover={
              handleOpenStartNewTaskConfirmPopover
            }
            handleOpenEditTaskMenuPopover={handleOpenEditTaskMenuPopover}
            handleCreateNewTask={handleCreateNewTask}
          />
        ))}
      </TaskListContainerDiv>
      <PlusButtonContainerDiv>
        <PlusButton size="44px" onClickPlusButton={handleCreateTaskList} />
      </PlusButtonContainerDiv>
    </ContainerDiv>
  );
};

export default TabComponent;
