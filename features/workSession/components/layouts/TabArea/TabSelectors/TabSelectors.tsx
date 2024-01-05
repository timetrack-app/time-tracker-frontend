import React, { MutableRefObject } from 'react';
import styled from 'styled-components';

// types
import { Tab } from '../../../../../../types/entity';

// components
import TabSelector from './TabSelector';
import EditableTabSelector from './EditableTabSelector';
import { PlusButton } from '../../../ui';

// const
import { breakPoint } from '../../../../../../const/styles/breakPoint';

type TabSelectorsProps = {
  tabs: Tab[];
  selectedTabId: number;
  handleSelectTab: (tab: Tab) => void;
  onClickPlusButton: () => void;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
};

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SelectorsContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  overflow-x: scroll;
  /* overflow-y: visible; */
  white-space: nowrap;

  max-width: 75%;
  margin-inline: 1em;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${breakPoint.tablet} {
    max-width: 90%;
  }
`;

const TabSelectors = ({
  tabs,
  selectedTabId,
  handleSelectTab,
  onClickPlusButton,
  onOpenMenuPopover,
}: TabSelectorsProps) => {
  return (
    <ContainerDiv>
      <SelectorsContainerDiv>
        {tabs.map((tab) => {
          const isSelected = tab.id === selectedTabId;
          if (isSelected)
            return (
              <EditableTabSelector
                key={tab.id}
                tab={tab}
                onOpenMenuPopover={onOpenMenuPopover}
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
      </SelectorsContainerDiv>

      <PlusButton onClickPlusButton={onClickPlusButton} />
    </ContainerDiv>
  );
};

export default TabSelectors;
