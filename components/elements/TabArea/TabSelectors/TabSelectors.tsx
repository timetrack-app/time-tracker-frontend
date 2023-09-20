import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../types/entity';
import TabSelector from './TabSelector/TabSelector';
import PlusCircle from '../../common/PlusCircle/PlusCircle';

type TabSelectorsProps = {
  tabs: Tab[];
  selectedTabId: number;
  handleSelectTab: (tab: Tab) => void;
  onClickPlusCircle: () => void;
};

const ContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;
const TabSelectors = ({
  tabs,
  selectedTabId,
  handleSelectTab,
  onClickPlusCircle,
}: TabSelectorsProps) => (
  <ContainerDiv>
    {tabs.map((tab) => (
      <TabSelector
        key={tab.id}
        tab={tab}
        isSelected={tab.id === selectedTabId}
        handleSelectTab={handleSelectTab}
      />
    ))}
    <PlusCircle onClickPlusCircle={onClickPlusCircle} />
  </ContainerDiv>
);

export default TabSelectors;
