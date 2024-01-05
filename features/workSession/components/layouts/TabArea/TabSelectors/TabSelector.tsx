import React from 'react';
import styled from 'styled-components';

// types
import { Tab } from '../../../../../../types/entity';

const ContainerDiv = styled.button`
  width: 112px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.componentBackground};
`;

const TabNameP = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

export type TabSelectorProps = {
  tab: Tab;
  handleSelectTab: (tab: Tab) => void;
  className?: string;
};

const TabSelector = ({ tab, handleSelectTab, className }: TabSelectorProps) => {
  return (
    <ContainerDiv onClick={() => handleSelectTab(tab)} className={className}>
      <TabNameP>{tab.name}</TabNameP>
    </ContainerDiv>
  );
};

export default TabSelector;
