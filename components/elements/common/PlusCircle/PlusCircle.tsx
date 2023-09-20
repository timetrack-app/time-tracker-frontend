import React from 'react';
import styled from 'styled-components';
import {
  dryadBark,
  astrograniteDebris,
  washedBlack,
  white,
  gainsboro,
} from '../../../../const/styles/colors';
import { ColorThemeName } from '../../../../types/colorTheme';
import { useAppSelector } from '../../../../stores/hooks';
import { selectColorTheme } from '../../../../stores/slices/colorThemeSlice';

type PlusCircleProps = {
  onClickPlusCircle: () => void;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  cursor: pointer;
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

const PlusP = styled.div<{
  colorThemeName: ColorThemeName;
}>`
  color: ${({ colorThemeName }) => {
    if (colorThemeName === 'light') return dryadBark;
    return white;
  }};
  font-size: 20px;
  font-weight: 400;
`;

const PlusCircle = ({ onClickPlusCircle }: PlusCircleProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      onClick={onClickPlusCircle}
    >
      <PlusP colorThemeName={currentColorThemeName}>+</PlusP>
    </ContainerDiv>
  );
};

export default PlusCircle;
