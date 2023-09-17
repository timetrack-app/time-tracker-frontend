import React from 'react';
import { Tab } from '../../../../types/entity';

type TabSelectorProps = {
  tabs: Tab[];
  handleSelectTab: (tab: Tab) => void;
};
const TabSelector = ({ tabs, handleSelectTab }: TabSelectorProps) => {
  console.log(tabs, handleSelectTab);

  return <div>TabSelector</div>;
};

export default TabSelector;
