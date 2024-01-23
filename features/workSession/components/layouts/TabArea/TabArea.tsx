// libraries
import { useEffect, memo } from 'react';
import styled from 'styled-components';

// stores
import { useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';
import { selectCurrentSelectedTab } from '../../../../../stores/slices/selectedTabSlice';

// types
import { ColorThemeName } from '../../../../../types/colorTheme';
import { Tab } from '../../../../../types/entity';

// components
import TabSelectors from './TabSelectors/TabSelectors';
import TabComponent from './TabComponent/TabComponent';
import RenameTabModal from './RenameTabModal/RenameTabModal';
import EditTabMenuPopover from './EditTabMenuPopover';

// const
import { breakPoint } from '../../../../../const/styles/breakPoint';

// hooks
import {
  useModal,
  usePopover,
} from '../../../../../components/elements/common';

const ContainerDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  @media ${breakPoint.tablet} {
    // 100% - (width of OnGoingTimerArea + flex gap)
    width: calc(100% - (310px + 24px));
  }
`;

const TabSelectorWrapper = styled.div<{ colorThemeName: ColorThemeName }>`
  position: relative;
  margin-bottom: 0.8em;
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
`;

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

const TabArea = ({
  tabs,
  handleCreateNewTab,
  handleRenameTab,
  handleDeleteTab,
  handleCreateNewList,
  handleRenameList,
  handleDeleteList,
  handleCreateNewTask,
  handleStartNewTask,
  handleRenameTask,
  handleDeleteTask,
}: TabAreaProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const selectedTab = useAppSelector(selectCurrentSelectedTab);

  const {
    isOpen: isOpenRenameTabModal,
    onOpen: onOpenRenameTabModal,
    onClose: onCloseRenameTabModal,
  } = useModal();
  const {
    isOpen: isOpenEditTabMenuPopover,
    onOpen: onOpenEditTabMenuPopover,
    onClose: onCloseEditTabMenuPopover,
    triggerPosition: editTabMenuPopoverTriggerPosition,
  } = usePopover();

  // Close popover when modal is opened
  useEffect(() => {
    if (isOpenRenameTabModal) {
      onCloseEditTabMenuPopover();
    }
  }, [isOpenRenameTabModal, onCloseEditTabMenuPopover]);

  // global state `selectedTab` is not a state to manage tab data,
  // so we need to find the tab data from useState `tabs` array
  // There's a slight update timing gap on useState and global state,
  // so we need to set tabs[0] as default value
  const selectedTabState =
    tabs.find((tab) => tab.id === selectedTab.id) ?? tabs[0];

  return (
    <ContainerDiv>
      <EditTabMenuPopover
        triggerPosition={editTabMenuPopoverTriggerPosition}
        isOpen={isOpenEditTabMenuPopover}
        onClose={onCloseEditTabMenuPopover}
        onRename={onOpenRenameTabModal}
        onDelete={handleDeleteTab}
      />
      <RenameTabModal
        isOpen={isOpenRenameTabModal}
        onClose={onCloseRenameTabModal}
        onSubmit={handleRenameTab}
        currentTabName={selectedTab.name}
      />
      <TabSelectorWrapper colorThemeName={currentColorTheme}>
        <TabSelectors
          tabs={tabs}
          selectedTabId={selectedTab.id}
          onClickPlusButton={handleCreateNewTab}
          onOpenMenuPopover={onOpenEditTabMenuPopover}
        />
      </TabSelectorWrapper>
      <TabComponent
        tab={selectedTabState}
        handleCreateTaskList={() => handleCreateNewList(selectedTab.id)}
        handleRenameList={handleRenameList}
        handleDeleteList={handleDeleteList}
        handleCreateNewTask={handleCreateNewTask}
        handleRenameTask={handleRenameTask}
        handleDeleteTask={handleDeleteTask}
        handleStartNewTask={handleStartNewTask}
      />
    </ContainerDiv>
  );
};

export default memo(TabArea);
