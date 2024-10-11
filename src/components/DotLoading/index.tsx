import React from 'react';
import { useIsMobile } from 'redux/selector/mobile';
import styles from './style.module.css';

export type DotLoadingPropsType = {
  className?: string;
};

const DotLoading: React.FC<DotLoadingPropsType> = (props: DotLoadingPropsType) => {
  const { className } = props;
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex items-center justify-between w-[30px] ${
        isMobile ? styles.dotLoadingMobile : styles.dotLoadingPc
      } ${className}`}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default DotLoading;
