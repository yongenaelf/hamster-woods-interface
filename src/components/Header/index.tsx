import Wallet from './components/Wallet';
import Award from './components/Award';
import Intro from './components/Intro';
import Setting from './components/Setting';
import styles from './style.module.css';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header__menu}>
        <Wallet />
        <Award />
        <Intro />
        <div className="ml-3">
          <Setting />
        </div>
      </div>
    </div>
  );
}
