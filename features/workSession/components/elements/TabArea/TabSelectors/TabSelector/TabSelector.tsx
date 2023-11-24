import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../../types/entity';
import { ColorThemeName } from '../../../../../../../types/colorTheme';
import { useAppSelector } from '../../../../../../../stores/hooks';
import { selectColorTheme } from '../../../../../../../stores/slices/colorThemeSlice';

export type TabSelectorProps = {
  tab: Tab;
  handleSelectTab: (tab: Tab) => void;
  className?: string;
};

const ContainerDiv = styled.div<{
  colorThemeName: ColorThemeName;
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
    ${({ theme, colorThemeName }) => {
      if (colorThemeName === 'dark') {
        return theme.colors.border;
      }

      return theme.colors.border;
    }};
  background: ${({ theme, colorThemeName }) => {
    if (colorThemeName === 'dark') {
      return theme.colors.componentBackground;
    }

    return theme.colors.componentBackground;
  }};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 3px 6px 0 ${theme.colors.border}` : 'none'};
`;

const TabNameP = styled.p<{
  colorThemeName: ColorThemeName;
}>`
  color: ${({ theme, colorThemeName }) => {
    if (colorThemeName === 'dark') return theme.colors.text;

    return theme.colors.border;
  }};
  font-size: 1.25em;
`;

const TabSelector = ({ tab, handleSelectTab, className }: TabSelectorProps) => {
  const currentColorThemeName = useAppSelector(selectColorTheme);
  return (
    <ContainerDiv
      colorThemeName={currentColorThemeName}
      onClick={() => handleSelectTab(tab)}
      className={className}
    >
      <TabNameP colorThemeName={currentColorThemeName}>{tab.name}</TabNameP>
    </ContainerDiv>
  );
};

export default TabSelector;
