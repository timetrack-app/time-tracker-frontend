import React, { MutableRefObject, useMemo } from 'react';
import styled from 'styled-components';

// types
import { Tab } from '../../../../../../types/entity';

// components
import TabSelector from './TabSelector';
import EditableTabSelector from './EditableTabSelector';
import { PlusButton } from '../../../ui';

// const
import { breakPoint } from '../../../../../../const/styles/breakPoint';
import { useAppSelector } from '../../../../../../stores/hooks';
import { selectCurrentSelectedTab } from '../../../../../../stores/slices/selectedTabSlice';

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
  onClickPlusButton: () => void;
  onOpenMenuPopover: (ref: MutableRefObject<HTMLElement>) => void;
};

const TabSelectors = ({
  tabs,
  onClickPlusButton,
  onOpenMenuPopover,
}: TabSelectorsProps) => {
  const selectedTab = useAppSelector(selectCurrentSelectedTab);
  const selectedTabId = selectedTab?.id ?? '';

  const sortedTabs = useMemo(() => {
    // copy tabs to avoid mutating original tabs
    const copiedTabs = [...tabs];
    return copiedTabs.sort((a, b) => a.displayOrder - b.displayOrder);
  }, [tabs]);
  return (
    <ContainerDiv>
      <SelectorsContainerDiv>
        {sortedTabs.map((tab) => {
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
