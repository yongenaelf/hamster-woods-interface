import { Modal, ModalProps } from 'antd';
import Image from 'next/image';
import closeImg from 'assets/images/close.png';

import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';

export default function CustomModal({ children, title, onCancel, closable = true, className, ...params }: ModalProps) {
  const { isMobile } = useGetState();
  return (
    <Modal
      className={`${styles.customModal} ${
        isMobile && styles.mobileCustomModal
      } bg-[#EEE2C4] border-[#9A531F] text-center text-[#953D22] ${className}`}
      {...params}
      closable={closable}
      onCancel={onCancel}
      closeIcon={<Image src={closeImg} alt="closeImg" />}>
      <div className={`${isMobile ? 'text-[20px]' : 'text-[32px]'} font-fonarto text-[#953D22] text-center`}>
        {title}
      </div>
      <div className={`${isMobile ? 'mt-[24px]' : 'mt-[40px]'} w-full`}>{children}</div>
    </Modal>
  );
}
