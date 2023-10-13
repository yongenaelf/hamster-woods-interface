'use client';
import Modal from 'components/CommonModal';
import CommonBtn from 'components/CommonBtn';
import styles from './style.module.css';

interface ILeaderBoardNotStartedModal {
  open: boolean;
  onCancel: () => void;
}

export default function LeaderBoardNotStartedModal({ open, onCancel }: ILeaderBoardNotStartedModal) {
  return (
    <Modal open={open} title="Notice" onCancel={onCancel} className={styles.leaderboardNotStartedModal}>
      <div className="mb-6 md:mb-[37px] md:text-[24px] md:leading-[32px]">
        <p>Leaderboard not available now. Please stay tuned for upcoming challenges.</p>
      </div>
      <div className="mx-2">
        <CommonBtn title="Confirm" onClick={onCancel} className={styles.confirmBtn}></CommonBtn>
      </div>
    </Modal>
  );
}
