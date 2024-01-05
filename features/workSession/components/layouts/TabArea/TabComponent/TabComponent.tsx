import React, { MutableRefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
// types
import { Tab, TaskList } from '../../../../../../types/entity';

// components and components related hooks
import TaskListComponent from './TaskListComponent/TaskListComponent';
import EditListMenuPopover from './EditListMenuPopover';
import RenameListModal from './RenameListModal/RenameListModal';
import {
  DeleteListConfirmModal,
  useDeleteListConfirmModal,
} from './DeleteListConfirmModal';
import {
  useModal,
  usePopover,
} from '../../../../../../components/elements/common';
import { PlusButton } from '../../../ui';

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
};

const TabComponent = ({
  tab,
  handleCreateTaskList,
  handleRenameList,
  handleDeleteList,
  handleCreateNewTask,
  handleRenameTask,
  handleDeleteTask,
}: TabComponentProps) => {
  const [currentList, setCurrentList] = useState(undefined);
  const { lists } = tab;

  const {
    isOpen: isOpenRenameListModal,
    onOpen: onOpenRenameListModal,
    onClose: onCloseRenameListModal,
  } = useModal();
  const {
    isOpen: isOpenEditListMenuPopover,
    onClose: onCloseEditListMenuPopover,
    onOpen: onOpenEditListMenuPopover,
    triggerPosition: editListMenuPopoverTriggerPosition,
  } = usePopover();

  const {
    isOpenDeleteListConfirmModal,
    onOpenDeleteListConfirmModal,
    onCloseDeleteListConfirmModal,
  } = useDeleteListConfirmModal();

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

  // Close popover when modal is opened
  useEffect(() => {
    if (isOpenRenameListModal) {
      onCloseEditListMenuPopover();
    }
  }, [isOpenRenameListModal, onCloseEditListMenuPopover]);

  return (
    <ContainerDiv>
      <EditListMenuPopover
        triggerPosition={editListMenuPopoverTriggerPosition}
        isOpen={isOpenEditListMenuPopover}
        onClose={onCloseEditListMenuPopover}
        onRename={onOpenRenameListModal}
        onDelete={onOpenDeleteListConfirmModal}
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
        handleYesButtonOnClick={() => {
          handleDeleteList(tab.id, currentList.id);
          onCloseDeleteListConfirmModal();
        }}
      />
      <TaskListContainerDiv>
        {lists.map((taskList) => (
          <TaskListComponent
            key={taskList.id}
            taskList={taskList}
            onOpenMenuPopover={(ref) =>
              handleOpenEditListMenuPopover(ref, taskList)
            }
            handleCreateNewTask={handleCreateNewTask}
            handleRenameTask={handleRenameTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </TaskListContainerDiv>
      <PlusButtonContainerDiv>
        <PlusButton size={'44px'} onClickPlusButton={handleCreateTaskList} />
      </PlusButtonContainerDiv>
    </ContainerDiv>
  );
};

export default TabComponent;
