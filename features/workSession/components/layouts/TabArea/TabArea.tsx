// libraries
import { useEffect, memo } from 'react';
import styled from 'styled-components';

// stores
import { useAppDispatch, useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';
import {
  updateSelectedTab,
  selectCurrentSelectedTab,
} from '../../../../../stores/slices/selectedTabSlice';

// types
import { ColorThemeName } from '../../../../../types/colorTheme';
import { Tab } from '../../../../../types/entity';

// components
import TabSelectors from './TabSelectors/TabSelectors';
import TabComponent from './TabComponent/TabComponent';
import EditTabMenuBar from './EditTabMenuBar';
import RenameTabPopover from './RenameTabPopover/RenameTabPopover';

// const
import { breakPoint } from '../../../../../const/styles/breakPoint';

// hooks
import { useTabEditMenuBarAndRenamePopover } from '../../../hooks';
import { usePopover } from '../../../../../components/elements/common';
import EditTabMenuPopover from './EditTabMenuPopover';

type TabAreaProps = {
  tabs: Tab[];
  handleCreateNewTab: () => void;
  handleRenameTab: (newTabName: string) => void;
  handleDeleteTab: () => void;
  handleCreateNewList: (tabId: number) => void;
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

// styled components

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  /* box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light'
      ? `0 5px 6px 0 ${theme.colors.border}`
      : 'none'}; */

  @media ${breakPoint.tablet} {
    // 100% - (width of OnGoingTimerArea + flex gap)
    width: calc(100% - (310px + 24px));
  }
`;

const TabSelectorWrapper = styled.div<{ colorThemeName: ColorThemeName }>`
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: 12px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    z-index: 1;
    width: 20px;
    height: 100%;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: ${({ theme, colorThemeName }) =>
      colorThemeName === 'light'
        ? `linear-gradient(to right, ${theme.colors.componentBackground}, rgba(255,255,255,0))`
        : `linear-gradient(to right, ${theme.colors.componentBackground}, rgba(32,37,40,0))`};
  }

  &::after {
    right: 0;
    background: ${({ theme, colorThemeName }) =>
      colorThemeName === 'light'
        ? `linear-gradient(to left, ${theme.colors.componentBackground}, rgba(255,255,255,0))`
        : `linear-gradient(to left, ${theme.colors.componentBackground}, rgba(32,37,40,0))`};
  }

  @media ${breakPoint.tablet} {
    /* padding-right: 1em; */
  }
`;

const TabComponentWrapper = styled.div`
  height: 100%;
`;

const TabArea = ({
  tabs,
  handleCreateNewTab,
  handleRenameTab,
  handleDeleteTab,
  handleCreateNewList,
  handleRenameList,
  handleDeleteList,
  handleCreateNewTask,
  handleRenameTask,
  handleDeleteTask,
}: TabAreaProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  const {
    isOpenTabEditMenuBar,
    isOpenTabRenamePopover,
    editableTabSelectorPosition,
    toggleTabEditMenuBar,
    onOpenTabRenamePopover,
    onCloseTabRenamePopover,
    onCloseTabEditMenuBarAndTabRenamePopover,
  } = useTabEditMenuBarAndRenamePopover();

  const {
    isOpen: isOpenEditTabMenuPopover,
    onClose: onCloseEditTabMenuPopover,
    position,
    togglePopover,
  } = usePopover();

  // on selecting a tab
  const handleSelectTab = (tab: Tab) => {
    dispatch(updateSelectedTab(tab));
  };

  useEffect(() => {
    if (tabs.length) dispatch(updateSelectedTab(tabs[0]));
  }, [dispatch, tabs]);

  useEffect(() => {
    onCloseTabEditMenuBarAndTabRenamePopover();
  }, [onCloseTabEditMenuBarAndTabRenamePopover, selectedTab]);

  return (
    <ContainerDiv colorThemeName={currentColorTheme}>
      <EditTabMenuPopover
        position={position}
        isOpen={isOpenEditTabMenuPopover}
        onClose={onCloseEditTabMenuPopover}
        onRename={onOpenTabRenamePopover}
        onDelete={handleDeleteTab}
      />
      <RenameTabPopover
        editableTabSelectorPosition={editableTabSelectorPosition}
        currentTabName={selectedTab.name}
        isOpen={isOpenTabRenamePopover}
        onSubmit={handleRenameTab}
        onDiscard={onCloseTabRenamePopover}
      />
      <TabSelectorWrapper colorThemeName={currentColorTheme}>
        <TabSelectors
          tabs={tabs}
          selectedTabId={selectedTab.id}
          isOpenMenubar={isOpenTabEditMenuBar}
          handleSelectTab={handleSelectTab}
          onClickPlusCircleButton={handleCreateNewTab}
          toggleMenuBar={togglePopover}
        />
      </TabSelectorWrapper>
      <TabComponentWrapper>
        <TabComponent
          tab={selectedTab}
          handleCreateTaskList={() => handleCreateNewList(selectedTab.id)}
          handleRenameList={handleRenameList}
          handleDeleteList={handleDeleteList}
          handleCreateNewTask={handleCreateNewTask}
          handleRenameTask={handleRenameTask}
          handleDeleteTask={handleDeleteTask}
        />
      </TabComponentWrapper>
    </ContainerDiv>
  );
};

export default memo(TabArea);
