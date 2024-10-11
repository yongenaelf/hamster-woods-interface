'use client';
import { Modal, ModalProps, Progress } from 'antd';
import { useIsMobile } from 'redux/selector/mobile';
import Image from 'next/image';
import closeTinyImg from 'assets/images/closeTiny.png';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { useEffect } from 'react';
import DotLoading from 'components/DotLoading';

export type LoadingModalPropsType = {
  onCancel: () => void;
  open: boolean;
  className?: string;
};

export default function LoadingModal({ onCancel, open, className, ...params }: LoadingModalPropsType & ModalProps) {
  const isMobile = useIsMobile();
  const { loadingCountdown } = useGetState();
  useEffect(() => {
    if (loadingCountdown === 100) {
      onCancel();
    }
  }, [loadingCountdown, onCancel]);
  return (
    <Modal
      className={`${isMobile ? styles.mobileLoadingModal : styles.pcLoadingModal} ${className}`}
      open={open}
      closable
      onCancel={onCancel}
      maskClosable={false}
      centered
      closeIcon={<Image width={isMobile ? 28 : 48} src={closeTinyImg} alt="closeTinyImg" />}
      zIndex={9999}
      {...params}>
      <div className="flex items-baseline justify-center">
        <span
          className={`${
            isMobile ? '!text-[16px] leading-[24px]' : '!text-[24px] leading-[32px]'
          } font-paytone text-[#A15A1C] text-center mr-[4px]`}>
          {'Syncing on-chain account info'}
        </span>
        <DotLoading />
      </div>
      <div className={`${isMobile ? 'mt-[24px]' : 'mt-[32px]'} flex justify-between ${styles.progressContainer}`}>
        <Progress percent={loadingCountdown || 0} showInfo={false} strokeColor="#A15A1C" trailColor="#EEE2C4" />
        <span className={`text-[#953D22] font-medium ${isMobile ? 'text-[16px]' : 'text-[20px]'}`}>{`${
          loadingCountdown || 0
        }%`}</span>
      </div>
    </Modal>
  );
}
