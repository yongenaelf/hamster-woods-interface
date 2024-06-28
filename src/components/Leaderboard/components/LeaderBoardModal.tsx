import { ModalProps } from 'antd';

import styles from './style.module.css';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';

export default function LeaderBoardModal({
  children,
  title,
  onCancel,
  closable = true,
  className,
  ...params
}: ModalProps) {
  const isMobile = useIsMobile();

  return (
    <CustomModal
      className={`${styles.leaderBoardModal} ${className}`}
      closable={closable}
      title={title}
      onCancel={onCancel}
      {...params}
      centered>
      {children}
    </CustomModal>
  );
}
