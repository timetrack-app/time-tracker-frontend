import React from 'react';
import styled from 'styled-components';
import { Task, TaskList } from '../../../../../types/entity';
import TaskListName from './TaskListName/TaskListName';
import TaskCard from './TaskCard/TaskCard';
import CreateTaskButton from './CreateTaskButton/CreateTaskButton';

type TaskListComponentProps = {
  taskList: TaskList;
};

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

const TaskListComponent = ({ taskList }: TaskListComponentProps) => {
  const handleEditTask = (task: Task) => {
    alert(task);
  };
  return (
    <ContainerDiv>
      <TaskListName name={taskList.name} />
      {taskList.tasks.map((task) => (
        <TaskCard task={task} onClickEditIcon={() => handleEditTask(task)} />
      ))}
      <CreateTaskButton onClickCreateTaskCard={() => alert('create task')} />
    </ContainerDiv>
  );
};

export default TaskListComponent;
