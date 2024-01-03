import React from 'react';
import styled from 'styled-components';
import { Tab } from '../../../../../../types/entity';
import TabSelector from './TabSelector';
import PlusCircleButton from './PlusCircleButton';
import { breakPoint } from '../../../../../../const/styles/breakPoint';
import EditableTabSelector from './EditableTabSelector';

type TabSelectorsProps = {
  tabs: Tab[];
  selectedTabId: number;
  isOpenMenubar: boolean;
  handleSelectTab: (tab: Tab) => void;
  onClickPlusCircleButton: () => void;

  toggleMenuBar: (rect: DOMRect) => void;
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
  /* Replated first tab spacing left logic with this */
  margin-left: 1em;

  @media ${breakPoint.tablet} {
  }
`;

const TabSelectors = ({
  tabs,
  selectedTabId,
  isOpenMenubar,
  handleSelectTab,
  onClickPlusCircleButton,
  toggleMenuBar,
}: TabSelectorsProps) => {
  return (
    <ContainerDiv>
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedTabId;
        if (isSelected)
          return (
            <EditableTabSelector
              key={tab.id}
              tab={tab}
              isOpenMenubar={isOpenMenubar}
              toggleMenuBar={toggleMenuBar}
            />
          );
        return (
          <TabSelector
            key={tab.id}
            tab={tab}
            handleSelectTab={handleSelectTab}
          />
        );
      })}
      <PlusCircleButton onClickPlusCircleButton={onClickPlusCircleButton} />
    </ContainerDiv>
  );
};

export default TabSelectors;
