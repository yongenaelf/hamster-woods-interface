/* eslint-disable react/no-unescaped-entities */
'use client';
import Modal from './index';
import { CountDownModalPropsType } from './type';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';
import useCountdown from 'hooks/useCountDown';
import { formatTime } from 'utils/formatTime';

export default function CountDownModal({ onCancel, open, onConfirm }: CountDownModalPropsType) {
  const { hours, minutes, seconds } = useCountdown();
  return (
    <Modal className={styles.showBeanPassModal} open={open} title="Notice" onCancel={onCancel} destroyOnClose>
      <p className="text-base leading-[24px]">
        You've used up all your GOs to play today. New GOs will be available in
      </p>
      <p className="mt-[21px] text-2xl text-[24px] font-black leading-6 leading-6">
        {formatTime({ hours, minutes, seconds })}.
      </p>
      <CommonBtn title="Confirm" className="mx-3 mt-[27px]" onClick={onConfirm} />
    </Modal>
  );
}
