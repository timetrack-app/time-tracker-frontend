import React, { MutableRefObject, useMemo } from 'react';
import styled from 'styled-components';

import TaskCard from './TaskCard';

import { Task } from '../../../../../../../../types/entity';

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

type TaskCardListDisplayProps = {
  tasks: Task[];
  handleOpenStartNewTaskConfirmPopover: (
    task: Task,
    ref: MutableRefObject<HTMLElement>,
  ) => void;
  handleOpenEditTaskMenuPopover: (
    ref: MutableRefObject<HTMLElement>,
    task: Task,
  ) => void;
};

const TaskCardListDisplay = ({
  tasks,
  handleOpenStartNewTaskConfirmPopover,
  handleOpenEditTaskMenuPopover,
}: TaskCardListDisplayProps) => {
  const sortedTasks = useMemo(() => {
    // copy tasks to avoid mutating original tasks
    const copiedTasks = [...tasks];
    return copiedTasks.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [tasks]);

  return (
    tasks.length > 0 && (
      <TaskCardListContainerDiv>
        {sortedTasks.map((task) => (
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
    )
  );
};

export default TaskCardListDisplay;
