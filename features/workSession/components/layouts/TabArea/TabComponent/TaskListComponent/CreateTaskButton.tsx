import React from 'react';
import styled from 'styled-components';

// types
import { ColorThemeName } from '../../../../../../../types/colorTheme';

// const
import {
  astrograniteDebris,
  dryadBark,
  gainsboro,
  vegetation,
  washedBlack,
  white,
} from '../../../../../../../const/styles/colors';

// stores
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

type CreateTaskButtonProps = {
  onClickCreateTaskCard: () => void;
};
const StyledButton = styled.button<{
  colorThemeName: ColorThemeName;
}>`
  position: relative;
  width: 100%;
  height: 93px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
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
  &:hover {
    opacity: 0.5;
  }
  &:focus {
    border: none;
    outline: 2px solid ${vegetation};
  }
`;

const NameP = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const CreateTaskButton = ({ onClickCreateTaskCard }: CreateTaskButtonProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <StyledButton
      colorThemeName={currentColorThemeName}
      onClick={onClickCreateTaskCard}
    >
      <NameP>+ Create a task</NameP>
    </StyledButton>
  );
};

export default CreateTaskButton;
