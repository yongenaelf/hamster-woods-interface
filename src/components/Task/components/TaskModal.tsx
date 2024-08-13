import { ModalProps } from 'antd';

import styles from './style.module.css';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';
import React from 'react';

export interface ILeaderBoardModalProps extends ModalProps {
  onCancel?: () => void;
}

export default function TaskModal({
  children,
  title,
  onCancel,
  closable = true,
  className,
  ...params
}: ILeaderBoardModalProps) {
  const isMobile = useIsMobile();

  return (
    <CustomModal
      className={`${styles.taskModal} ${isMobile ? styles.taskMobileModal : styles.taskPcModal} !pb-0 ${className}`}
      closable={closable}
      title={title}
      onCancel={onCancel}
      {...params}
      centered>
      {children}
    </CustomModal>
  );
}
