import { ModalProps } from 'antd';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';

export default function GameRecordModal({ children, title, onCancel, ...params }: ModalProps) {
  const isMobile = useIsMobile();
  return (
    <CustomModal
      className={`styles.gameRecordModal ${isMobile ? 'h-[33rem]' : 'h-[41rem'}  h-[756px]`}
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
