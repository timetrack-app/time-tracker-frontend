import React from 'react';
import styled from 'styled-components';
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

type CreateTaskListButtonProps = {
  onClickCreateTaskList: () => void;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  border: 1px solid
    ${({ colorThemeName }) => {
      if (colorThemeName === 'light') return gainsboro;
      return astrograniteDebris;
    }};
  background: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return white;
    return washedBlack;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const NameP = styled.p<{
  colorThemeName: ColorThemeName;
}>`
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
  font-size: 20px;
  font-weight: 400;
`;

const CreateTaskListButton = ({
  onClickCreateTaskList,
}: CreateTaskListButtonProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      onClick={onClickCreateTaskList}
    >
      <NameP colorThemeName={currentColorThemeName}>+ Create new list</NameP>
    </ContainerDiv>
  );
};

export default CreateTaskListButton;
