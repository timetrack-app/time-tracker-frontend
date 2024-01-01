import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsPencil } from 'react-icons/bs';
import { Task } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import {
  astrograniteDebris,
  dryadBark,
  gainsboro,
  washedBlack,
  white,
} from '../../../../../../../const/styles/colors';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';
import { secondsToHHMMSS } from '../../../../../../../utils/timer';

type TaskCardProps = {
  task: Task;
  onClickEditIcon: () => void;
};
const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: relative;
  width: 100%;
  height: 93px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  border: 1px solid
    ${({ colorThemeName }) => {
      if (colorThemeName === 'light') return gainsboro;
      return astrograniteDebris;
    }};
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
  background: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return white;
    return washedBlack;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const IconContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: absolute;
  top: 12px;
  right: 12px;
  transition: opacity 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
`;

const NameP = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const TimeP = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

const TaskCard = ({ task, onClickEditIcon }: TaskCardProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv colorThemeName={currentColorThemeName}>
      <IconContainerDiv
        colorThemeName={currentColorThemeName}
        onClick={onClickEditIcon}
      >
        <BsPencil />
      </IconContainerDiv>
      <NameP>{task.name}</NameP>
      <TimeP>{secondsToHHMMSS(task.totalTime)}</TimeP>
    </ContainerDiv>
  );
};

export default TaskCard;
