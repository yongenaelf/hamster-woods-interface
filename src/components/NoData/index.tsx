import React from 'react';
import { useIsMobile } from 'redux/selector/mobile';
import NoDataSvg from 'assets/images/no-data.svg';
import styles from './style.module.css';
import Icon from '@ant-design/icons';

type TNoDataProps = {
  tips?: string;
};

const NoData: React.FC<TNoDataProps> = (props: TNoDataProps) => {
  const { tips = 'No Data' } = props;
  const isMobile = useIsMobile();
  return (
    <div className={`${styles.wrap} h-full w-full flex flex-col flex-grow items-center justify-center`}>
      <Icon component={() => <NoDataSvg />} height={80} width={80} className={`${styles.NoDataSvg}`} />
      <div className={`${isMobile ? 'text-[2rem]' : 'text-[20px]'}  text-center mt-[24px] font-medium text-[#AE694C]`}>
        {tips}
      </div>
    </div>
  );
};

export default NoData;
