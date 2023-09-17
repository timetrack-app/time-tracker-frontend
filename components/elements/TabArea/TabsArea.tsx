import styled from 'styled-components';

import { useState } from 'react';
import { useAppSelector } from '../../../stores/hooks';
import { selectColorTheme } from '../../../stores/slices/colorThemeSlice';

import { ColorThemeName } from '../../../types/colorTheme';
import { Tab } from '../../../types/entity';
import TabSelector from './TabSelector/TabSelector';
import TabComponent from './TabComponent/TabComponent';

const ContainerDiv = styled.div<{ colorThemeName: ColorThemeName }>`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.componentBackground};
  box-shadow: ${({ colorThemeName, theme }) =>
    colorThemeName === 'light' ? `0 5px 6px 0 ${theme.colors.border}` : 'none'};
`;

type TabsAreaProps = {
  tabs: Tab[];
};

const TabsArea = ({ tabs }: TabsAreaProps) => {
  const currentColorTheme = useAppSelector(selectColorTheme);

  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  const handleSelectTab = (tab: Tab) => {
    setSelectedTab(tab);
  };
  return (
    <ContainerDiv colorThemeName={currentColorTheme}>
      <TabSelector tabs={[]} handleSelectTab={handleSelectTab} />
      <TabComponent tab={selectedTab} />
    </ContainerDiv>
  );
};

export default TabsArea;
