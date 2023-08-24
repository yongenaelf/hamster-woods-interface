import Modal from './index';
import { ShowBeanPassType, ShowNFTModalPropsType } from './type';
import Image from 'next/image';
import styles from './style.module.css';
import NftDemo from 'assets/images/NFT1.svg';

export default function GetBeanPassModal({ type, onCancel, open }: ShowNFTModalPropsType) {
  return (
    <Modal
      className={styles.showBeanPassModal}
      open={open}
      title={type === ShowBeanPassType.Display ? 'Your BeanPass' : 'Congratulation'}
      onCancel={onCancel}>
      <NftDemo className="mx-auto h-[160px] w-[160px] md:mt-0 md:h-[240px]  md:w-[240px]"></NftDemo>
      <div className={styles.nft_label}>
        <span className={styles.nft_text}>BeanPass #1107</span>
        <Image src={require('assets/images/link-icon.png')} alt="" className="ml-1 h-6 w-6"></Image>
      </div>
    </Modal>
  );
}
