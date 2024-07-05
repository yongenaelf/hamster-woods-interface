import React from 'react';
import { useIsMobile } from 'redux/selector/mobile';

type TNoDataProps = {
  tips?: string;
};

const NoData: React.FC<TNoDataProps> = (props: TNoDataProps) => {
  const { tips = 'No Data' } = props;
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-grow items-center justify-center rounded-bl-xl rounded-br-xl">
      <div className={`${isMobile ? 'px-8' : 'px-32'}`}>
        <img
          src={require('assets/images/no-record.png').default.src}
          alt="No Record"
          className={`mx-auto ${isMobile ? 'w-[40px] h-[40px] mb-[16px]' : 'w-[80px] h-[80px] mb-[24px]'}`}
        />
        <div className={`text-center font-roboto font-medium ${isMobile ? 'text-[14px]' : 'text-[20px]'}`}>{tips}</div>
      </div>
    </div>
  );
};

export default NoData;
