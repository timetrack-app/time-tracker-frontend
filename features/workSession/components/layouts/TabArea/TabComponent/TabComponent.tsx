import React, { MutableRefObject, useEffect, useState } from 'react';
import styled from 'styled-components';
// types
import { Tab, TaskList } from '../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../types/colorTheme';

// const
import {
  astrograniteDebris,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../const/styles/colors';
import { breakPoint } from '../../../../../../const/styles/breakPoint';

// global state
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';

// hooks
import { useListEditMenuBarAndRenamePopover } from '../../../../hooks';

// components and components related hooks
import TaskListComponent from './TaskListComponent/TaskListComponent';
import CreateTaskListButton from './CreateTaskListButton';
import EditListMenuPopover from './EditListMenuPopover';
import RenameListModal from './RenameListModal/RenameListModal';
import { CreateTaskDrawer, useCreateTaskDrawer } from './CreateTaskDrawer';
import {
  DeleteListConfirmModal,
  useDeleteListConfirmModal,
} from './DeleteListConfirmModal';
import {
  useModal,
  usePopover,
} from '../../../../../../components/elements/common';

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

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  height: 100%;
  overflow-x: scroll;
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid
    ${({ colorThemeName }) => {
      if (colorThemeName === 'light') return gainsboro;
      return astrograniteDebris;
    }};
  background: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return white;
    return washedBlack;
  }};
`;

const TaskListContainerDiv = styled.div`
  /* width: 322px; */

  flex: 0 0 auto;
  width: 100%;

  @media ${breakPoint.tablet} {
    flex: initial;
    width: auto;
  }
`;

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
  const currentColorThemeName = useAppSelector(selectColorTheme);
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

  const {
    currentListId,
    isOpenCreateTaskDrawer,
    onOpenCreateTaskDrawer,
    onCloseCreateTaskDrawer,
  } = useCreateTaskDrawer();

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
    <ContainerDiv colorThemeName={currentColorThemeName}>
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
      <CreateTaskDrawer
        isOpen={isOpenCreateTaskDrawer}
        onClose={onCloseCreateTaskDrawer}
        listId={currentListId}
        handleCreateNewTask={handleCreateNewTask}
      />
      {lists.map((taskList) => (
        <TaskListContainerDiv key={taskList.id}>
          <TaskListComponent
            taskList={taskList}
            onOpenMenuPopover={(ref) =>
              handleOpenEditListMenuPopover(ref, taskList)
            }
            onClickCreateTaskCard={onOpenCreateTaskDrawer}
            handleRenameTask={handleRenameTask}
            handleDeleteTask={handleDeleteTask}
          />
        </TaskListContainerDiv>
      ))}
      <TaskListContainerDiv>
        <CreateTaskListButton onClickCreateTaskList={handleCreateTaskList} />
      </TaskListContainerDiv>
    </ContainerDiv>
  );
};

export default TabComponent;
