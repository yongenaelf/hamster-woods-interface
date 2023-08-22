import Modal from './index';
import { CountDownModalPropsType } from './type';
import styles from './style.module.css';
import CommonBtn from 'components/CommonBtn';

export default function CountDownModal({ onCancel, open, onConfirm }: CountDownModalPropsType) {
  return (
    <Modal className={styles.showBeanPassModal} open={open} title="Notice" onCancel={onCancel}>
      <p className="text-base leading-[24px]">
        Your game count for today has been used up.The game count will be remade after:
      </p>
      <p className="mt-[21px] text-[24px] leading-6">10h : 55m : 32s</p>
      <CommonBtn title="Confirm" className="mx-3 mt-[27px]" onClick={onConfirm} />
    </Modal>
  );
}
