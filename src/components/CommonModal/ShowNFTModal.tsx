import Modal from './index';
import { ShowBeanPassType, ShowNFTModalPropsType } from './type';
import Image from 'next/image';
import styles from './style.module.css';
import { isMobileDevices } from 'utils/isMobile';

export default function GetBeanPassModal({ type, onCancel, open }: ShowNFTModalPropsType) {
  return (
    <Modal
      className={styles.showBeanPassModal}
      open={open}
      title={type === ShowBeanPassType.Display ? 'Your BeanPass' : 'Congratulation'}
      onCancel={onCancel}>
      <Image
        width={isMobileDevices() ? '160' : '240'}
        height={isMobileDevices() ? '160' : '240'}
        src={require('assets/images/link-icon.png')}
        className="mx-auto bg-white md:mt-0"
        alt=""></Image>
      <div className={styles.nft_label}>
        <span className={styles.nft_text}>BeanPass #1107</span>
        <Image src={require('assets/images/link-icon.png')} alt="" className="ml-1 h-6 w-6"></Image>
      </div>
    </Modal>
  );
}
