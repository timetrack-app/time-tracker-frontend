import React from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { LuTimer } from 'react-icons/lu';

// types
import { Task } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';

// const
import {
  astrograniteDebris,
  dryadBark,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../../const/styles/colors';

// stores
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

// utils
import { secondsToHHMMSS } from '../../../../../../../utils/timer';
import { IconButton } from '../../../../../../../components/elements/common';

type TaskCardProps = {
  task: Task;
  onClickEditIcon: () => void;
  onClickTimerIcon: () => void;
};
const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  width: 100%;
  height: 93px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TopHalfDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const EditIconButtonContainerDiv = styled.div`
  position: absolute;
  top: 1/2;
  right: 0;
`;

const BottomHalfDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NameP = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const TimerContainerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TimeP = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const TaskCard = ({
  task,
  onClickEditIcon,
  onClickTimerIcon,
}: TaskCardProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv colorThemeName={currentColorThemeName}>
      <TopHalfDiv>
        <NameP>{task.name}</NameP>
        <EditIconButtonContainerDiv>
          <IconButton onClick={onClickEditIcon}>
            <BsThreeDots size={20} />
          </IconButton>
        </EditIconButtonContainerDiv>
      </TopHalfDiv>
      <BottomHalfDiv>
        <TimerContainerDiv>
          <IconButton onClick={onClickTimerIcon}>
            <LuTimer size={20} />
          </IconButton>
          <TimeP>{secondsToHHMMSS(task.totalTime)}</TimeP>
        </TimerContainerDiv>
      </BottomHalfDiv>
    </ContainerDiv>
  );
};

export default TaskCard;
