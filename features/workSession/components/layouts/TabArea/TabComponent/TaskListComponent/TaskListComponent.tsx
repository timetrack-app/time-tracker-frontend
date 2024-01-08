import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

// types
import { Task, TaskList } from '../../../../../../../types/entity';

// components
import TaskListName from './TaskListName';
import TaskCard from './TaskCard';
import CreateTaskButton from './CreateTaskButton/CreateTaskButton';

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

const TaskCardListContainerDiv = styled.div`
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 8px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
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
      {taskList.tasks.length > 0 && (
        <TaskCardListContainerDiv>
          {taskList.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleOpenStartNewTaskConfirmPopover={
                handleOpenStartNewTaskConfirmPopover
              }
              handleOpenEditTaskMenuPopover={handleOpenEditTaskMenuPopover}
            />
          ))}
        </TaskCardListContainerDiv>
      )}
      <CreateTaskButton
        taskListId={taskList.id}
        handleCreateNewTask={handleCreateNewTask}
      />
    </ContainerDiv>
  );
};

export default TaskListComponent;
