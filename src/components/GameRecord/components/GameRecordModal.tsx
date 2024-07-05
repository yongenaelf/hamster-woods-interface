import { ModalProps } from 'antd';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';
import styles from './style.module.css';

export default function GameRecordModal({
  children,
  title,
  onCancel,
  ...params
}: ModalProps & { onCancel: () => void }) {
  const isMobile = useIsMobile();
  return (
    <CustomModal
      className={`${styles.gameRecordModal} ${isMobile ? 'h-[33rem]' : 'h-[41rem'}  h-[756px]`}
      {...params}
      closable
      centered
      title={title}
      onCancel={onCancel}
      {...params}>
      {children}
    </CustomModal>
  );
}
