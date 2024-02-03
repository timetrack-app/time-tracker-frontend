import React from 'react';
import styled from 'styled-components';

// components and components related hooks
import {
  ButtonPrimary,
  ButtonSecondary,
  Popover,
  PopoverProps,
} from '../../../../../../components/elements/common';

// stores
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectCurrentSelectedTab } from '../../../../../../stores/slices/selectedTabSlice';

// types
import { Task } from '../../../../../../types/entity';
import { selectActiveTask } from '../../../../../../stores/slices/activeTaskSlice';

const StartNewTaskPopoverContainer = styled.div<{}>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const MessageP = styled.p`
  font-size: 18px;
`;

const ButtonsContainerDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledButtonPrimary = styled(ButtonPrimary)`
  font-size: 16px;
  height: 44px;
`;

const StyledButtonSecondary = styled(ButtonSecondary)`
  font-size: 16px;
  height: 44px;
`;

type StartNewTaskPopoverProps = {
  task: Task;
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
} & PopoverProps;

const StartNewTaskConfirmPopover = ({
  triggerPosition,
  isOpen,
  onClose,
  task,
  handleStartNewTask,
}: StartNewTaskPopoverProps) => {
  const currentSelectedTab = useAppSelector(selectCurrentSelectedTab);
  const newTaskTabId = currentSelectedTab?.id ?? 0;
  const {
    id: currentTaskId,
    listId: currentListId,
    tabId: currentTabId,
    totalTime: currentTaskTotalTime,
  } = useAppSelector(selectActiveTask);

  const currentActiveTaskInfo = {
    tabId: currentTabId,
    listId: currentListId,
    taskId: currentTaskId,
  };

  const newTaskInfo = {
    tabId: newTaskTabId,
    listId: task?.listId,
    taskId: task?.id,
  };

  const onClickStartNewTask = () => {
    handleStartNewTask(
      currentActiveTaskInfo,
      newTaskInfo,
      currentTaskTotalTime,
    );
    onClose();
  };

  return (
    <Popover
      triggerPosition={triggerPosition}
      left={216}
      isOpen={isOpen}
      onClose={onClose}
    >
      <StartNewTaskPopoverContainer>
        <MessageP>
          Are you sure you want to start "{task?.name}
          "?
        </MessageP>
        <ButtonsContainerDiv>
          <StyledButtonPrimary autoFocus onClick={onClickStartNewTask}>
            Start
          </StyledButtonPrimary>
          <StyledButtonSecondary onClick={onClose}>
            Cancel
          </StyledButtonSecondary>
        </ButtonsContainerDiv>
      </StartNewTaskPopoverContainer>
    </Popover>
  );
};

export default StartNewTaskConfirmPopover;
