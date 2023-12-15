import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../types/colorTheme';
import {
  astrograniteDebris,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../const/styles/colors';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../stores/slices/colorThemeSlice';
import TaskListComponent from './TaskListComponent/TaskListComponent';
import CreateTaskListButton from './CreateTaskListButton/CreateTaskListButton';
import { breakPoint } from '../../../../../../const/styles/breakPoint';
import { useListEditMenuBarAndRenamePopover } from '../../../../hooks';
import EditListMenuBar from './EditListMenuBar/EditListMenuBar';
import RenameListPopover from './RenameListPopover/RenameListPopover';
import DeleteListConfirmModal from '../../modals/DeleteListConfirmModal/DeleteListConfirmModal';
import { useDeleteListConfirmModal } from '../../../../hooks/modal/useDeleteListConfirmModal';

type TabComponentProps = {
  tab: Tab;
  handleCreateTaskList: () => void;
  handleRenameList: (
    newListName: string,
    tabId: number,
    listId: number,
  ) => void;
  handleDeleteList: (tabId: number, listId: number) => void;
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
}: TabComponentProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  const { lists } = tab;

  const {
    isOpenListEditMenuBar,
    isOpenListRenamePopover,
    listPosition,
    currentList,
    toggleListEditMenuBar,
    onOpenListRenamePopover,
    onCloseListRenamePopover,
    onCloseListEditMenuBarAndListRenamePopover,
  } = useListEditMenuBarAndRenamePopover();

  const {
    isOpenDeleteListConfirmModal,
    onOpenDeleteListConfirmModal,
    onCloseDeleteListConfirmModal,
  } = useDeleteListConfirmModal();

  const onSubmitListRename = (newListName: string) => {
    handleRenameList(newListName, tab.id, currentList.id);
    onCloseListRenamePopover();
  };

  return (
    <ContainerDiv colorThemeName={currentColorThemeName}>
      <EditListMenuBar
        isOpen={isOpenListEditMenuBar}
        listPosition={listPosition}
        onRename={onOpenListRenamePopover}
        onDelete={onOpenDeleteListConfirmModal}
      />
      <RenameListPopover
        isOpen={isOpenListRenamePopover}
        currentListName={currentList ? currentList.name : ''}
        listPosition={listPosition}
        onSubmit={onSubmitListRename}
        onDiscard={onCloseListRenamePopover}
      />
      <DeleteListConfirmModal
        isOpen={isOpenDeleteListConfirmModal}
        onCloseModal={onCloseDeleteListConfirmModal}
        handleYesButtonOnClick={() => {
          handleDeleteList(tab.id, currentList.id);
          onCloseDeleteListConfirmModal();
          onCloseListEditMenuBarAndListRenamePopover();
        }}
      />
      {lists.map((taskList) => (
        <TaskListContainerDiv key={taskList.id}>
          <TaskListComponent
            taskList={taskList}
            isOpenMenubar={isOpenListEditMenuBar}
            toggleMenuBar={toggleListEditMenuBar}
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
