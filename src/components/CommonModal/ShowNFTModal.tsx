import Modal from './index';
import { ShowBeanPassType, ShowNFTModalPropsType } from './type';
import Image from 'next/image';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { useMemo } from 'react';

export default function GetBeanPassModal({ type, onCancel, open }: ShowNFTModalPropsType) {
  const { configInfo } = useGetState();
  const handleJumpExplor = () => {
    window.open(configInfo?.beanPassTerminalUrl || '', '_blank');
  };

  const curBeanPassId = useMemo(() => {
    const strs = configInfo?.beanPassTerminalUrl.split('-');
    return strs?.[strs?.length - 1];
  }, [configInfo]);
  return (
    <Modal
      className={styles.showBeanPassModal}
      open={open}
      title={type === ShowBeanPassType.Display ? 'Your BeanPass' : 'Congratulations'}
      onCancel={onCancel}>
      <img
        src={configInfo?.beanPassPicUrl || ''}
        alt=""
        className="mx-auto h-[160px] w-[160px] md:mt-0 md:h-[240px]  md:w-[240px]"
      />
      <div className={styles.nft_label} onClick={handleJumpExplor}>
        <span className={styles.nft_text}>BeanPass #{curBeanPassId}</span>
        <Image src={require('assets/images/link-icon.png')} alt="" className="ml-1 h-6 w-6"></Image>
      </div>
    </Modal>
  );
}
