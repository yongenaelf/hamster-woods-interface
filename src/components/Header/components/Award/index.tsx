import Image from 'next/image';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
export default function Award() {
  const { playerInfo } = useGetState();

  return (
    <div className={styles.award}>
      <Image src={require('assets/images/header-coin.png')} alt="" className={styles.award__coin} />
      <span className={styles.award__amount}>{playerInfo?.sumScore || 0}</span>
    </div>
  );
}
