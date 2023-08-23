import { Asset, PortkeyAssetProvider } from '@portkey/did-ui-react';
import { Modal } from 'antd';
import { ChainId, KEY_NAME } from 'constants/platform';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInfo } from 'redux/reducer/info';
import styles from './style.module.css';
export default function Wallet() {
  const [assetVisible, setAssetVisible] = useState(false);

  const { walletInfo } = useSelector(selectInfo);

  const handleAsset = () => {
    setAssetVisible(true);
  };
  return (
    <>
      <Image
        src={require('assets/images/header-wallet.png')}
        alt=""
        className="h-10 w-10 object-cover"
        onClick={handleAsset}
      />

      <Modal
        className={styles.assetModal}
        open={assetVisible}
        onCancel={() => {
          setAssetVisible(false);
        }}>
        <PortkeyAssetProvider
          originChainId={walletInfo?.portkeyInfo?.chainId || ChainId}
          pin={walletInfo?.portkeyInfo?.pin}
          didStorageKeyName={KEY_NAME}>
          <Asset
            backIcon={null}
            onLifeCycleChange={(lifeCycle) => {
              console.log(lifeCycle, 'onLifeCycleChange');
            }}
          />
        </PortkeyAssetProvider>
      </Modal>
    </>
  );
}
