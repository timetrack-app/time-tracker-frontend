import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

// types
import { Task, TaskList } from '../../../../../../../types/entity';

// components
import TaskListName from './TaskListName';
import CreateTaskButton from './CreateTaskButton/CreateTaskButton';
import TaskCardListDisplay from './TaskCardListDisplay/TaskCardListDisplay';

// const
import { breakPoint } from '../../../../../../../const/styles/breakPoint';

const ContainerDiv = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  @media ${breakPoint.tablet} {
    /* following 4px rule */
    min-width: 208px;
  }
`;

type TaskListComponentProps = {
  taskList: TaskList;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
  handleOpenStartNewTaskConfirmPopover: (
    task: Task,
    ref: MutableRefObject<HTMLElement>,
  ) => void;
  handleOpenEditTaskMenuPopover: (
    ref: MutableRefObject<HTMLElement>,
    task: Task,
  ) => void;
  handleCreateNewTask: (
    tabId: number,
    listId: number,
    taskName: string,
    description: string,
  ) => Promise<void>;
};

const TaskListComponent = ({
  taskList,
  onOpenMenuPopover,
  handleOpenStartNewTaskConfirmPopover,
  handleOpenEditTaskMenuPopover,
  handleCreateNewTask,
}: TaskListComponentProps) => {
  return (
    <ContainerDiv>
      <TaskListName taskList={taskList} onOpenMenuPopover={onOpenMenuPopover} />
      <TaskCardListDisplay
        tasks={taskList.tasks}
        handleOpenStartNewTaskConfirmPopover={
          handleOpenStartNewTaskConfirmPopover
        }
        handleOpenEditTaskMenuPopover={handleOpenEditTaskMenuPopover}
      />
      <CreateTaskButton
        taskListId={taskList.id}
        handleCreateNewTask={handleCreateNewTask}
      />
    </ContainerDiv>
  );
};

export default TaskListComponent;
