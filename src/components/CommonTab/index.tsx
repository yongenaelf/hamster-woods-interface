import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './style.module.css';

const CommonTab: React.FC<TabsProps> = (props: TabsProps) => {
  return <Tabs className={styles.commonTab} {...props}></Tabs>;
};

export default CommonTab;
