import { ModalProps } from 'antd';

import styles from './style.module.css';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';
import { TabContentUser } from './TabContentUser';

export interface ILeaderBoardModalProps extends ModalProps {
  weeklyModal?: boolean;
}

export default function LeaderBoardModal({
  children,
  title,
  onCancel,
  closable = true,
  className,
  weeklyModal = false,
  ...params
}: ILeaderBoardModalProps) {
  const isMobile = useIsMobile();

  return (
    <CustomModal
      className={`${styles.leaderBoardModal} !pb-0 ${className} ${weeklyModal && styles.WeeklyModal}`}
      closable={closable}
      title={title}
      onCancel={onCancel}
      {...params}
      centered
      footer={<TabContentUser />}>
      {children}
    </CustomModal>
  );
}
