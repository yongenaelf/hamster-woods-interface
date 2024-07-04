import Wallet from './components/Wallet';
import Intro from './components/Intro';
import Setting from './components/Setting';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';
import { Tooltip } from 'antd';
import Image from 'next/image';
import AcornGetImage from 'assets/images/recreation/acorn-get.png';
import AcornWeeklyImage from 'assets/images/recreation/acorn-weekly.png';
import QuestionImage from 'assets/images/recreation/question.png';
import HeaderLockImage from 'assets/images/headerMenu/header-locked.png';
import { useState } from 'react';
import LockedAcornsModal from 'components/LockedAcornsModal';
import GetMoreACORNSModal from 'components/CommonModal/GetMoreACORNSModal';
import { divDecimalsStr } from 'utils/calculate';
import { useIsMobile } from 'redux/selector/mobile';

export default function Header() {
  const { walletType } = useGetState();
  const { playerInfo } = useGetState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [lockedAcornsVisible, setLockedAcornsVisible] = useState(false);
  const [moreAcornsVisible, setMoreAcornsVisible] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={styles.headerContainer}>
      <div className={`${styles.header__menu} mt-2`}>
        {walletType !== WalletType.discover && <Wallet />}
        <div className="flex-grow"></div>
        <div className="mx-3">
          <Intro />
        </div>
        <Setting />
      </div>
      <div className={`${styles.header__menu} flex items-center gap-2 mt-2`}>
        <div className={styles['board__acorn']}>
          <Image
            src={AcornGetImage}
            alt="bean"
            className="h-[30px] w-[30px]"
            onClick={() => setMoreAcornsVisible(true)}
          />
          <span className={styles['board__acorn__number']}>
            {divDecimalsStr(playerInfo?.totalAcorns, playerInfo?.acornsDecimals)}
          </span>
          <Tooltip
            title={
              <div
                className={`${
                  isMobile ? 'px-[12px] py-[8px] text-[12px]' : 'px-[24px] py-[16px] text-[18px] leading-[28px]'
                }`}>
                <div className="">{`$ACORNS won through gameplay has a vesting period of 30 days. Before unlocking, $ACORNS can't be used to purchase hopping chances, nor can it be transferred or traded.
In the upcoming version, staking will be introduced, allowing token holders to stake $ACORNS for rewards.`}</div>
                <div
                  className={`text-right ${isMobile ? 'text-[16px]' : 'text-[24px]'}   leading-[28px]`}
                  onClick={() => setTooltipOpen(false)}>
                  OK
                </div>
              </div>
            }
            open={tooltipOpen}
            overlayStyle={{ maxWidth: isMobile ? 320 : 480, borderRadius: isMobile ? 16 : 32 }}
            overlayClassName={styles.board__tooltip}
            trigger="click"
            placement="bottom"
            color="#A15A1C">
            <Image
              src={QuestionImage}
              alt="bean"
              className="h-[16px] w-[16px] mr-[6px]"
              onClick={() => setTooltipOpen(true)}
            />
          </Tooltip>
        </div>
        <div className={styles['board__acorn']}>
          <Image src={AcornWeeklyImage} alt="bean" className="h-[30px] w-[30px]" />
          <span className={styles['board__acorn__number']}>
            {divDecimalsStr(playerInfo?.weeklyAcorns, playerInfo?.acornsDecimals)}
          </span>
        </div>
        <div className="flex-grow"></div>
        <Image
          onClick={() => setLockedAcornsVisible(true)}
          src={HeaderLockImage}
          alt="bean"
          className="h-[40px] w-[40px] mb-[12px]"
        />
      </div>
      <LockedAcornsModal open={lockedAcornsVisible} onCancel={() => setLockedAcornsVisible(false)} />
      <GetMoreACORNSModal open={moreAcornsVisible} onCancel={() => setMoreAcornsVisible(false)} />
    </div>
  );
}
