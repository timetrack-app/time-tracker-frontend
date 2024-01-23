import React, { MutableRefObject, useRef } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { IoPlay } from 'react-icons/io5';
import { FaRunning } from 'react-icons/fa';

// types
import { Task } from '../../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../../types/colorTheme';

// stores
import { useAppSelector } from '../../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../../stores/slices/colorThemeSlice';
import { selectActiveTask } from '../../../../../../../../stores/slices/activeTaskSlice';

// utils
import { secondsToHHMMSS } from '../../../../../../../../utils/timer';

// components
import { IconButton } from '../../../../../../../../components/elements/common';

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  width: 100%;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;
  cursor: grab;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TopHalfDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const BottomHalfDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NameP = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const TimeP = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

type TaskCardProps = {
  task: Task;
  handleOpenStartNewTaskConfirmPopover: (
    task: Task,
    ref: MutableRefObject<HTMLElement>,
  ) => void;
  handleOpenEditTaskMenuPopover: (
    ref: MutableRefObject<HTMLElement>,
    task: Task,
  ) => void;
};

const TaskCard = ({
  task,
  handleOpenStartNewTaskConfirmPopover,
  handleOpenEditTaskMenuPopover,
}: TaskCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentColorThemeName = useAppSelector(selectColorTheme);
  const { id, totalTime } = useAppSelector(selectActiveTask);

  const isTimerRunning = !!id;
  const isThisTaskRunning = id === task.id;

  return (
    <ContainerDiv colorThemeName={currentColorThemeName} ref={ref}>
      <TopHalfDiv>
        <NameP>{task.name}</NameP>
        <IconButton onClick={() => handleOpenEditTaskMenuPopover(ref, task)}>
          <BsThreeDots size={20} />
        </IconButton>
      </TopHalfDiv>
      <BottomHalfDiv>
        <TimeP>
          {isThisTaskRunning
            ? secondsToHHMMSS(totalTime)
            : secondsToHHMMSS(task.totalTime)}
        </TimeP>
        {isTimerRunning &&
          (isThisTaskRunning ? (
            <FaRunning size={20} />
          ) : (
            <IconButton
              onClick={() => handleOpenStartNewTaskConfirmPopover(task, ref)}
            >
              <IoPlay size={20} />
            </IconButton>
          ))}
      </BottomHalfDiv>
    </ContainerDiv>
  );
};

export default TaskCard;
