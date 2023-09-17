import React from 'react';
import { Tab } from '../../../../types/entity';

type TabComponentProps = {
  tab: Tab;
};

const TabComponent = ({ tab }: TabComponentProps) => {
  console.log(tab);

  return <div>tab</div>;
};

export default TabComponent;
