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
      className={`${styles.customModal} ${isMobile && styles.mobileCustomModal} ${className}`}
      {...params}
      closable={closable}
      onCancel={onCancel}
      maskClosable={false}
      closeIcon={
        <Image width={isMobile ? 28 : 48} className={isMobile ? 'w-[28]' : 'w-[48]'} src={closeImg} alt="closeImg" />
      }>
      <div className={`${isMobile ? '!text-[20px]' : '!text-[32px]'} font-fonarto text-[#953D22] text-center`}>
        {title}
      </div>
      <div className={`${isMobile ? 'mt-[24px]' : 'mt-[40px]'} w-full`}>{children}</div>
    </Modal>
  );
}
