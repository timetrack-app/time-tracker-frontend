import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

// types
import { Task, TaskList } from '../../../../../../../types/entity';

// components
import TaskListName from './TaskListName';
import TaskCard from './TaskCard';
import CreateTaskButton from './CreateTaskButton';

type TaskListComponentProps = {
  taskList: TaskList;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
  onClickCreateTaskCard: (listId: number) => void;
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

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const TaskListComponent = ({
  taskList,
  onOpenMenuPopover,
  onClickCreateTaskCard,
}: TaskListComponentProps) => {
  const handleEditTask = (task: Task) => {
    alert(task);
  };
  return (
    <ContainerDiv>
      <TaskListName taskList={taskList} onOpenMenuPopover={onOpenMenuPopover} />
      {taskList.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClickEditIcon={() => handleEditTask(task)}
          onClickTimerIcon={() => alert('timer')}
        />
      ))}
      <CreateTaskButton
        onClickCreateTaskCard={() => onClickCreateTaskCard(taskList.id)}
      />
    </ContainerDiv>
  );
};

export default TaskListComponent;
