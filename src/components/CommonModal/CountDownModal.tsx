/* eslint-disable react/no-unescaped-entities */
import Modal from './index';
import { CountDownModalPropsType } from './type';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';
import getCountdown from 'utils/getCountdown';
import { useEffect, useRef, useState } from 'react';

export default function CountDownModal({ onCancel, open, onConfirm }: CountDownModalPropsType) {
  const [countTime, setCountTime] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const interval = useRef<any>(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      setCountTime(getCountdown());
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  return (
    <Modal className={styles.showBeanPassModal} open={open} title="Notice" onCancel={onCancel} destroyOnClose>
      <p className="text-base leading-[24px]">
        You've used up all your GOs to play today. New GOs will be available in
      </p>
      <p className="mt-[21px] text-2xl text-[24px] font-black leading-6 leading-6">
        {countTime.hours}h : {countTime.minutes}m : {countTime.seconds}s
      </p>
      <CommonBtn title="Confirm" className="mx-3 mt-[27px]" onClick={onConfirm} />
    </Modal>
  );
}
