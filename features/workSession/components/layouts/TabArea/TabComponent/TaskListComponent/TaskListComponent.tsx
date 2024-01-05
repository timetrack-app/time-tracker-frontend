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

const TaskListComponent = ({
  taskList,
  onOpenMenuPopover,
  handleCreateNewTask,
}: TaskListComponentProps) => {
  const handleEditTask = (task: Task) => {
    alert(task);
  };
  return (
    <ContainerDiv>
      <TaskListName taskList={taskList} onOpenMenuPopover={onOpenMenuPopover} />
      {taskList.tasks.length > 0 && (
        <TaskCardListContainerDiv>
          {taskList.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClickEditIcon={() => handleEditTask(task)}
              onClickTimerIcon={() => alert('timer')}
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
