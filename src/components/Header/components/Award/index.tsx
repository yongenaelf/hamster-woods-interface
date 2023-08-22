import Image from 'next/image';
import styles from './style.module.css';
export default function Award() {
  return (
    <div className={styles.award}>
      <Image src={require('assets/images/header-coin.png')} alt="" className={styles.award__coin} />
      <span className={styles.award__amount}>234,567</span>
    </div>
  );
}
