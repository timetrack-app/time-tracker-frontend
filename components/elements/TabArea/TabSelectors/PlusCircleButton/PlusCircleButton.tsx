import React from 'react';
import styled from 'styled-components';
import {
  dryadBark,
  astrograniteDebris,
  washedBlack,
  white,
  gainsboro,
} from '../../../../../const/styles/colors';
import { ColorThemeName } from '../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';

type PlusCircleButtonProps = {
  onClickPlusCircleButton: () => void;
};

const PlusButton = styled.button<{
  colorThemeName: ColorThemeName;
}>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 20px;
  font-weight: 400;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.5;
  }
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
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

const PlusCircleButton = ({
  onClickPlusCircleButton,
}: PlusCircleButtonProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <PlusButton
      colorThemeName={currentColorThemeName}
      onClick={onClickPlusCircleButton}
      type="button"
    >
      +
    </PlusButton>
  );
};

export default PlusCircleButton;
