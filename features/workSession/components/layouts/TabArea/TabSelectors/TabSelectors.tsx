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

type TabSelectorsProps = {
  tabs: Tab[];
  selectedTabId: number;
  onClickPlusButton: () => void;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
};

const TabSelectors = ({
  tabs,
  selectedTabId,
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
          return <TabSelector key={tab.id} tab={tab} />;
        })}
      </SelectorsContainerDiv>

      <PlusButton size="44px" onClickPlusButton={onClickPlusButton} />
    </ContainerDiv>
  );
};

export default TabSelectors;
