import { Asset, PortkeyAssetProvider } from '@portkey/did-ui-react';
import { ChainId, KEY_NAME } from 'constants/platform';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';
import { LeftOutlined } from '@ant-design/icons';

export default function MyAsset() {
  const router = useRouter();
  const { walletInfo, walletType, isLogin } = useGetState();
  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    } else if (walletType !== WalletType.portkey) {
      router.push('/');
    }
  }, [isLogin, router, walletType]);
  return (
    <PortkeyAssetProvider
      originChainId={walletInfo?.portkeyInfo?.chainId || ChainId}
      pin={walletInfo?.portkeyInfo?.pin}
      didStorageKeyName={KEY_NAME}>
      <Asset
        backIcon={<LeftOutlined />}
        onOverviewBack={() => router.back()}
        onLifeCycleChange={(lifeCycle) => {
          console.log(lifeCycle, 'onLifeCycleChange');
        }}
      />
    </PortkeyAssetProvider>
  );
}
