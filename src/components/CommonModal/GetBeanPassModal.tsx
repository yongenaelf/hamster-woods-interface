import Modal from './index';
import CommonBtn from 'components/CommonBtn';
import { BeanPassModalPropsType } from './type';
import { GetBeanPassStatus } from './type';
import { useMemo } from 'react';

export default function GetBeanPassModal({ type, ...props }: BeanPassModalPropsType) {
  const displayText = useMemo(() => {
    return {
      [GetBeanPassStatus.Unacclaimed]: {
        title: 'Notice',
        btnText: 'Confirm',
        contentArr: ['Requires a BeanPass NFT', 'to start the game！'],
      },
      [GetBeanPassStatus.Recharge]: {
        title: 'Get a BeanPass',
        btnText: 'Go to wallet',
        contentArr: [
          'You need to have a BeanPass NFT to start the game！',
          'You need to deposit 5 ELF on the current sidechain to claim the BeanPass NFT.',
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
      [GetBeanPassStatus.Waiting]: {
        title: 'Notice',
        btnText: 'Confirm',
        contentArr: ['Your game count for today has been used up. The game count will be remade after:'],
      },
    }[type];
  }, [type]);
  return (
    <Modal open={props.open} title={displayText.title} onCancel={props.onCancel}>
      <div className="mb-6">
        {displayText.contentArr.map((text) => {
          return <p key={text}>{text}</p>;
        })}
      </div>
      <div className="mx-2">
        <CommonBtn title={displayText.btnText} onClick={props.onConfirm}></CommonBtn>
      </div>
    </Modal>
  );
}
