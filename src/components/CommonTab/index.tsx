import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const CommonTab: React.FC<TabsProps> = (props: TabsProps) => {
  return <Tabs {...props} />;
};

export default CommonTab;
