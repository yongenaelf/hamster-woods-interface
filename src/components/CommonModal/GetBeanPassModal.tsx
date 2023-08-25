import Modal from './index';
import CommonBtn from 'components/CommonBtn';
import { BeanPassModalPropsType } from './type';
import { GetBeanPassStatus } from './type';
import { useMemo } from 'react';
import styles from './style.module.css';

export default function GetBeanPassModal({ type, ...props }: BeanPassModalPropsType) {
  const displayText = useMemo(() => {
    return {
      [GetBeanPassStatus.Recharge]: {
        title: 'Get a BeanPass',
        btnText: 'Go to wallet',
        contentArr: [
          'You need to have a BeanPass NFT to start the game. ',
          'To claim the free BeanPass, please make sure your MainChain and SideChain balances combined to be no less than 5 ELF.',
        ],
      },
      [GetBeanPassStatus.Abled]: {
        title: 'Get a BeanPass',
        btnText: 'Get a BeanPass',
        contentArr: [
          'You need to have a BeanPass NFT to start the game！',
          'Click the button below to claim your BeanPass NFT!',
        ],
      },
      [GetBeanPassStatus.Noneleft]: {
        title: 'Get a BeanPass',
        btnText: 'I know',
        contentArr: [
          'You need to have a BeanPass NFT to start the game！',
          'Today’s BeanPass NFT has been claimed, please come back tommrow!',
        ],
      },
      [GetBeanPassStatus.Notfound]: {
        title: 'Get a BeanPass',
        btnText: 'I know',
        contentArr: [
          'You need to have a BeanPass NFT to start the game！',
          'You have already claimed the BeanPass NFT, but it is not in your address.',
        ],
      },
    }[type];
  }, [type]);
  return (
    <Modal open={props.open} title={displayText.title} onCancel={props.onCancel} className={styles.getBeanPassModal}>
      <div className="mb-6 md:mb-[37px] md:text-[24px] md:leading-[32px]">
        {displayText.contentArr.map((text) => {
          return <p key={text}>{text}</p>;
        })}
      </div>
      {displayText.btnText && (
        <div className="mx-2">
          <CommonBtn title={displayText.btnText} onClick={props.onConfirm} className={styles.confirmBtn}></CommonBtn>
        </div>
      )}
    </Modal>
  );
}
