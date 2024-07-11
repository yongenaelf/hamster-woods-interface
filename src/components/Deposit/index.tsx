import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';
import { LeftOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import { ComponentStyle, Deposit, ETransferDepositProvider } from '@etransfer/ui-react';

export default function DepositPage() {
  const router = useRouter();
  const { walletType, isLogin } = useGetState();
  // const { isShowRampBuy, isShowRampSell } = configInfo!;
  useEffect(() => {
    // if (!isLogin) {
    //   router.push('/login');
    // } else if (walletType !== WalletType.portkey) {
    //   router.push('/');
    // }
  }, [isLogin, router, walletType]);

  return (
    <div className={styles.asset}>
      <div>
        <LeftOutlined />
      </div>
      <ETransferDepositProvider>
        <Deposit componentStyle={ComponentStyle.Mobile} />
      </ETransferDepositProvider>
    </div>
  );
}
