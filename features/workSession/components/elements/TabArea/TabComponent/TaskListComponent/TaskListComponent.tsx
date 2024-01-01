import React from 'react';
import styled from 'styled-components';
import { Task, TaskList } from '../../../../../../../types/entity';
import TaskListName from './TaskListName';
import TaskCard from './TaskCard';
import CreateTaskButton from './CreateTaskButton/CreateTaskButton';

type TaskListComponentProps = {
  taskList: TaskList;
  isOpenMenubar: boolean;
  toggleMenuBar: (rect: DOMRect, list?: TaskList) => void;
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
  isOpenMenubar,
  toggleMenuBar,
  onClickCreateTaskCard,
  handleRenameTask,
  handleDeleteTask,
}: TaskListComponentProps) => {
  const handleEditTask = (task: Task) => {
    alert(task);
  };
  return (
    <ContainerDiv>
      <TaskListName
        taskList={taskList}
        isOpenMenubar={isOpenMenubar}
        toggleMenuBar={toggleMenuBar}
      />
      {taskList.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClickEditIcon={() => handleEditTask(task)}
        />
      ))}
      <CreateTaskButton
        onClickCreateTaskCard={() => onClickCreateTaskCard(taskList.id)}
      />
    </ContainerDiv>
  );
};

export default TaskListComponent;
