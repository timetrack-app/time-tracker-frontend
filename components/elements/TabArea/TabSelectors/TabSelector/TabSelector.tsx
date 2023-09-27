import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../types/entity';
import {
  dryadBark,
  gainsboro,
  white,
  vegetation,
  softPetals,
  astrograniteDebris,
  washedBlack,
} from '../../../../../const/styles/colors';
import { ColorThemeName } from '../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../stores/slices/colorThemeSlice';

type TabSelectorProps = {
  tab: Tab;
  isSelected: boolean;
  handleSelectTab: (tab: Tab) => void;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
  isSelected: boolean;
}>`
  width: 113px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  border: 1px solid
    ${({ colorThemeName, isSelected }) => {
      if (colorThemeName === 'light' && isSelected) return vegetation;
      if (colorThemeName === 'light') return gainsboro;
      if (isSelected) return white;
      return astrograniteDebris;
    }};
  background: ${({ colorThemeName, isSelected }) => {
    if (colorThemeName === 'light' && isSelected) return softPetals;
    if (colorThemeName === 'light') return white;
    if (isSelected) return vegetation;
    return washedBlack;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TabNameP = styled.p<{
  colorThemeName: ColorThemeName;
  isSelected: boolean;
}>`
  color: ${({ colorThemeName, isSelected }) => {
    if (colorThemeName === 'light' && isSelected) return vegetation;
    if (colorThemeName === 'light') return gainsboro;
    if (isSelected) return white;
    return dryadBark;
  }};
  font-size: 20px;
  font-weight: 400;
`;

const TabSelector = ({
  tab,
  isSelected,
  handleSelectTab,
}: TabSelectorProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      isSelected={isSelected}
      onClick={() => handleSelectTab(tab)}
    >
      <TabNameP colorThemeName={currentColorThemeName} isSelected={isSelected}>
        {tab.name}
      </TabNameP>
    </ContainerDiv>
  );
};

export default TabSelector;
