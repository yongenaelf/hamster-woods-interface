import React from 'react';

import GoButtonSvg from 'assets/images/recreation/go-button.svg';
import GoButtonPcSvg from 'assets/images/recreation/go-button-pc.svg';
import GO from 'assets/images/recreation/GO.svg';

import styles from './index.module.css';
import useGetState from 'redux/state/useGetState';

interface IGoButton {
  disabled?: boolean;
  go?: () => void;
}

function GoButton({ disabled, go }: IGoButton) {
  const { isMobile } = useGetState();

  return (
    <div
      className={`${styles['button-mobile']} ${
        !isMobile && styles.button
      } relative flex w-full items-center justify-center pb-[9px]`}>
      {isMobile && (
        <div className={styles['button__border']}>
          <div className={styles['button__border__top']} />
          <div className={styles['button__border__bottom']} />
        </div>
      )}

      <div className={`${styles['button__icon']} relative flex items-center justify-center`} onClick={() => go && go()}>
        {isMobile ? <GoButtonSvg /> : <GoButtonPcSvg />}

        <div className="absolute top-[8px] flex flex-col items-center justify-center">
          <GO className={`mb-[5px] h-auto ${isMobile ? 'mt-[10px] !w-[70px]' : 'mt-[16px] !w-[105px]'}`} />
          <span
            className={`${
              isMobile ? 'text-[14px] leading-[14px]' : 'text-[21px] leading-[21px]'
            } font-bold text-[#52300B]`}>
            3/5
          </span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GoButton);
