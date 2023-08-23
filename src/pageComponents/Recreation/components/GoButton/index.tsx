import React, { ReactElement } from 'react';

import GoButtonSvg from 'assets/images/recreation/go-button.svg';
import GoButtonDisabledSvg from 'assets/images/recreation/go-button-disabled.svg';
import GoButtonPcSvg from 'assets/images/recreation/go-button-pc.svg';
import GoButtonDisabledPcSvg from 'assets/images/recreation/go-button-pc-disabled.svg';

import styles from './index.module.css';
import useGetState from 'redux/state/useGetState';

export enum Status {
  LOADING = 'loading',
  DISABLED = 'disabled',
  NONE = 'none',
}

export interface IGoButton {
  status?: Status;
  playableCount?: number;
  sumScore?: number;
  go?: () => void;
}

function GoButton({ go, status = Status.NONE, playableCount = 0, sumScore = 5 }: IGoButton) {
  const { isMobile } = useGetState();

  const GoButtonBg: Record<Status, ReactElement> = {
    [Status.NONE]: <GoButtonSvg />,
    [Status.LOADING]: <GoButtonSvg />,
    [Status.DISABLED]: <GoButtonDisabledSvg />,
  };

  const GoButtonPcBg: Record<Status, ReactElement> = {
    [Status.NONE]: <GoButtonPcSvg />,
    [Status.LOADING]: <GoButtonPcSvg />,
    [Status.DISABLED]: <GoButtonDisabledPcSvg />,
  };

  const statusCom: Record<Status, ReactElement> = {
    [Status.NONE]: (
      <>
        <span
          className={`font-fonarto font-[500] tracking-tight text-[#fff] text-stroke-[#52300B] ${
            isMobile ? 'text-[48px] leading-[48px]' : 'text-[72px]'
          }`}>
          Go
        </span>
        <span
          className={`${
            isMobile ? 'text-[14px] leading-[14px]' : 'text-[21px] leading-[21px]'
          } font-bold text-[#52300B]`}>
          {playableCount}/{sumScore}
        </span>
      </>
    ),
    [Status.LOADING]: (
      <div className={`${styles['button__icon__loading']} ${isMobile ? 'mt-[10px] w-[45px]' : 'mt-[16px] w-[85px]'}`}>
        <div className={styles['button__icon__loading__bounce1']}></div>
        <div className={styles['button__icon__loading__bounce2']}></div>
      </div>
    ),
    [Status.DISABLED]: (
      <>
        <span
          className={`font-fonarto font-[500] text-[#fff] text-stroke-[#8E8E8E] ${
            isMobile ? 'text-[48px]' : 'text-[72px]'
          }`}>
          Go
        </span>
        <span
          className={`${
            isMobile ? 'text-[14px] leading-[14px]' : 'text-[21px] leading-[21px]'
          } font-bold text-[#8E8E8E]`}>
          {playableCount}/{sumScore}
        </span>
      </>
    ),
  };

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

      <button
        className={`${styles['button__icon']} cursor-custom relative flex items-center justify-center`}
        onClick={() => go && go()}>
        {isMobile ? GoButtonBg[status] : GoButtonPcBg[status]}
        <div className="absolute top-[4px] flex flex-col items-center justify-center">{statusCom[status]}</div>
      </button>
    </div>
  );
}

export default React.memo(GoButton);
