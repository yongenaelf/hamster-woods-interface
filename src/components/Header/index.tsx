import Wallet from './components/Wallet';
import Award from './components/Award';
import Intro from './components/Intro';
import Setting from './components/Setting';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';

export default function Header() {
  const { walletType } = useGetState();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header__menu}>
        {walletType !== WalletType.discover && <Wallet />}
        <Award />
        <Intro />
        <div className="ml-3">
          <Setting />
        </div>
      </div>
    </div>
  );
}
