import React from 'react';
import Menu from '../Menu';
import Ranking from 'assets/images/recreation/ranking.svg';
import Nft from 'assets/images/recreation/nft.svg';
import GoButton, { IGoButton, Status } from '../GoButton';
import useGetState from 'redux/state/useGetState';
import beanImage from 'assets/images/recreation/bean.png';

import styles from './index.module.css';
import Image from 'next/image';
import { dispatch } from 'redux/store';
import { toggleShowLeaderboard } from 'redux/reducer/info';

function Board({ go, status = Status.NONE, playableCount = 0, sumScore = 5 }: IGoButton) {
  const { isMobile } = useGetState();

  if (isMobile) {
    return (
      <div className="absolute right-[-16px] top-[-26px] z-[40]">
        <Menu icon={<Ranking className="h-[auto] w-[44px]" />} className="mb-[12px]" title="Leader Board" />
        <Menu icon={<Nft className="h-[auto] w-[29.5px]" />} title="NFT Giveaway" />
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col px-[47px] pt-[56px]">
        <div className="relative z-40 flex-1">
          <div className={styles['board__bean']}>
            <Image src={beanImage} alt="bean" className="h-[64px] w-[64px]" />
            <span className={styles['board__bean__number']}>234,567</span>
          </div>
          <Menu
            icon={<Ranking className="h-[auto] w-[76px]" />}
            className="mb-[24px]"
            title="Leader Board"
            onClick={() => dispatch(toggleShowLeaderboard())}
          />
          <Menu icon={<Nft className="h-[auto] w-[59px]" />} title="BeanPass NFT" />
        </div>
        <GoButton playableCount={playableCount} sumScore={sumScore} status={status} go={() => go && go()} />
      </div>
    );
  }
}

export default React.memo(Board);
