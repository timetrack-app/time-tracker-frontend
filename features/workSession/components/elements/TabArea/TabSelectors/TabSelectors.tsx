import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../types/entity';
import TabSelector from './TabSelector/TabSelector';
import PlusCircleButton from './PlusCircleButton/PlusCircleButton';
import { breakPoint } from '../../../../../../const/styles/breakPoint';

type TabSelectorsProps = {
  tabs: Tab[];
  selectedTabId: number;
  handleSelectTab: (tab: Tab) => void;
  onClickPlusCircleButton: () => void;
};

const ContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  overflow-x: scroll;
  overflow-y: visible;
  white-space: nowrap;

  width: 100%;
  max-width: 100%;

  @media ${breakPoint.tablet} {
  }
`;

const FirstTabSelector = styled(TabSelector)`
  margin-left: 1em;
`;

const TabSelectors = ({
  tabs,
  selectedTabId,
  handleSelectTab,
  onClickPlusCircleButton,
}: TabSelectorsProps) => {
  const getTabComponent = (idx: number) =>
    idx === 0 ? FirstTabSelector : TabSelector;

  return (
    <ContainerDiv>
      {tabs.map((tab, idx) => {
        const TabSelectorComponent = getTabComponent(idx);

        return (
          <TabSelectorComponent
            key={tab.id}
            tab={tab}
            isSelected={tab.id === selectedTabId}
            handleSelectTab={handleSelectTab}
          />
        );
      })}
      <PlusCircleButton onClickPlusCircleButton={onClickPlusCircleButton} />
    </ContainerDiv>
  );
};

export default TabSelectors;
