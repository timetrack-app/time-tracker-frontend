import React from 'react';
import styled from 'styled-components';

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
type Props = {
  task: Task;
  isSelected: boolean;
  onClick: () => void;
};
const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
  isSelected: boolean;
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

const NameP = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const InitialTaskCard = ({ task, isSelected, onClick }: Props) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      isSelected={isSelected}
      onClick={onClick}
    >
      <NameP>{task.name}</NameP>
    </ContainerDiv>
  );
};

export default InitialTaskCard;
