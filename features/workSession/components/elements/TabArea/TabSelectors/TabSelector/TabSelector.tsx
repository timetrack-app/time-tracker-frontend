import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

export type TabSelectorProps = {
  tab: Tab;
  isSelected: boolean;
  handleSelectTab: (tab: Tab) => void;
  className?: string;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
  isSelected: boolean;
}>`
  width: 7em;
  height: 1.8em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin-bottom: 0.5em;
  padding: 0.5em;
  cursor: pointer;
  border: 1px solid
    ${({ theme, colorThemeName, isSelected }) => {
      if (colorThemeName === 'dark') {
        return isSelected ? theme.colors.text : theme.colors.border;
      }

      return isSelected ? theme.colors.info : theme.colors.border;
    }};
  background: ${({ theme, colorThemeName, isSelected }) => {
    if (colorThemeName ==='dark') {
      return isSelected ? theme.colors.info : theme.colors.componentBackground;
    }

    return isSelected ? theme.colors.infoBg : theme.colors.componentBackground;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 3px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TabNameP = styled.p<{
  colorThemeName: ColorThemeName;
  isSelected: boolean;
}>`
  color: ${({ theme, colorThemeName, isSelected }) => {
    if (colorThemeName === 'dark') return theme.colors.text;

    return isSelected ? theme.colors.info : theme.colors.border;
  }};
  font-size: 1.25em;
`;

const TabSelector = ({
  tab,
  isSelected,
  handleSelectTab,
  className,
}: TabSelectorProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      isSelected={isSelected}
      onClick={() => handleSelectTab(tab)}
      className={className}
    >
      <TabNameP colorThemeName={currentColorThemeName} isSelected={isSelected}>
        {tab.name}
      </TabNameP>
    </ContainerDiv>
  );
};

export default TabSelector;
