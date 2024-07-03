'use client';
import CommonBtn from 'components/CommonBtn';
import { BeanPassModalPropsType } from './type';
import { GetBeanPassStatus } from './type';
import { useMemo } from 'react';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';
import useCountdown from 'hooks/useCountDown';
import { formatTime } from 'utils/formatTime';
import CustomModal from 'components/CustomModal';
import { useIsMobile } from 'redux/selector/mobile';

export default function GetBeanPassModal({ type, ...props }: BeanPassModalPropsType) {
  const { walletType, configInfo } = useGetState();
  const { hours, minutes, seconds } = useCountdown();
  const isMobile = useIsMobile();
  const displayText = useMemo(() => {
    return {
      [GetBeanPassStatus.Recharge]: {
        title: 'Acquire $ACORNS',
        btnText: walletType !== WalletType.discover ? 'Go to wallet' : '',
        contentArr: [
          'You need to have a $ACORNS NFT to start the game.',
          `To claim the free $ACORNS, please make sure your MainChain and SideChain balances combined to be no less than ${
            configInfo!.minElfNum
          } ELF.`,
        ],
      },
      [GetBeanPassStatus.Abled]: {
        title: 'Acquire $ACORNS',
        btnText: 'Acquire $ACORNS',
        contentArr: [
          'You need to have a $ACORNS NFT to start the game. ',
          'Click the button below to claim your $ACORNS.',
        ],
      },
      [GetBeanPassStatus.Noneleft]: {
        title: 'Acquire $ACORNS',
        btnText: 'I know',
        contentArr: [
          'You need to have a $ACORNS NFT to start the game! ',
          `Today's $ACORNS NFTs have all been claimed. Please come back tomorrow after ${formatTime({
            hours,
            minutes,
            seconds,
            showSecond: false,
          })} for another try.`,
        ],
      },
      [GetBeanPassStatus.Notfound]: {
        title: 'Get a $ACORNS',
        btnText: 'I know',
        contentArr: [
          'You need to have a $ACORNS NFT to start the game!',
          `Since you have already claimed a $ACORNS but it's not in your current wallet address now, please transfer it back or obtain a new one via the Forest NFT marketplace.`,
        ],
      },
      [GetBeanPassStatus.Need]: {
        title: 'Notice',
        btnText: 'Confirm',
        contentArr: [`You'll need a $ACORNS NFT to start the game.`],
      },
    }[type];
  }, [configInfo, hours, minutes, seconds, type, walletType]);
  return (
    <CustomModal
      open={props.open}
      title={displayText.title}
      onCancel={props.onCancel}
      className={styles.getBeanPassModal}>
      <div className="mb-6 md:mb-[37px] md:text-[24px] md:leading-[32px]">
        {displayText.contentArr.map((text, i) => {
          return <p key={i}>{text}</p>;
        })}
      </div>
      {displayText.btnText && (
        <div className={`${isMobile ? '' : 'mx-[64px]'} h-[70px]`}>
          <CommonBtn title={displayText.btnText} onClick={props.onConfirm} className={styles.confirmBtn}></CommonBtn>
        </div>
      )}
    </CustomModal>
  );
}
