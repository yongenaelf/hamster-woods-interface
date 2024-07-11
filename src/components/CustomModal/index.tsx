import { Modal, ModalProps } from 'antd';
import Image from 'next/image';
import closeImg from 'assets/images/close.png';

import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';

export interface ICustomModalProps extends ModalProps {
  onCancel?: () => void;
}

export default function CustomModal({
  children,
  title,
  onCancel,
  closable = true,
  className,
  ...params
}: ICustomModalProps) {
  const { isMobile } = useGetState();
  return (
    <Modal
      className={`${isMobile ? styles.mobileCustomModal : styles.customPcModal} ${className}`}
      {...params}
      closable={closable}
      onCancel={onCancel}
      maskClosable={false}
      closeIcon={
        <Image
          width={isMobile ? 28 : 48}
          className={isMobile ? 'w-[28px]' : 'w-[48px]'}
          src={closeImg}
          alt="closeImg"
        />
      }>
      <div
        className={`${
          isMobile ? '!text-[20px] leading-[20px]' : '!text-[32px] leading-[32px]'
        } font-paytone text-[#953D22] text-center`}>
        {title}
      </div>
      <div className={`${isMobile ? 'mt-[24px]' : 'mt-[40px]'} w-full`}>{children}</div>
    </Modal>
  );
}
