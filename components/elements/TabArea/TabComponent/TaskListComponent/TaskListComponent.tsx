import React from 'react';
import { TaskList } from '../../../../../types/entity';

type TaskListComponentProps = {
  taskList: TaskList;
};

const TaskListComponent = ({ taskList }: TaskListComponentProps) => {
  console.log(taskList);

  return <div>ListComponent</div>;
};

export default TaskListComponent;
