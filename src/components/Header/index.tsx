import styles from './index.module.css';
import Image from 'next/image';
import CommonModal from 'components/CommonModal';
import CommonBtn from 'components/CommonBtn';
import { useState } from 'react';
import { ChainId, KEY_NAME, LOGIN_EARGLY_KEY } from 'constants/platform';
import { useRouter } from 'next/navigation';
import { Asset, PortkeyAssetProvider } from '@portkey/did-ui-react';
import { Modal } from 'antd';
import { useSelector } from 'redux/store';
import { selectInfo } from 'redux/reducer/info';

export default function Header() {
  const [settingModalVisible, setSettingModalVisible] = useState(false);
  const [assetVisible, setAssetVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);

  const router = useRouter();

  const { walletInfo } = useSelector(selectInfo);
  console.log('walletInfo', walletInfo);

  const handleSetting = () => {
    setSettingModalVisible(true);
  };

  const handleAsset = () => {
    setAssetVisible(true);
  };

  const handleCancel = () => {
    setSettingModalVisible(false);
  };

  const handleRecord = () => {
    //open record modal
  };

  const handleLock = () => {
    router.push('/login');
  };

  const handleExit = () => {
    handleCancel();
    window.localStorage.removeItem(KEY_NAME);
    window.localStorage.removeItem(LOGIN_EARGLY_KEY);
    //logout and goto /login
    router.push('/login');
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header__menu}>
        <Image
          src={require('assets/images/header-wallet.png')}
          alt=""
          className={styles.menu__wallet}
          onClick={handleAsset}
        />
        <div className={styles.menu__award}>
          <Image src={require('assets/images/header-coin.png')} alt="" className={styles.award__coin} />
          <span className={styles.award__amount}>234,567</span>
        </div>
        <Image
          src={require('assets/images/header-intro.png')}
          alt=""
          className={styles.menu__intro}
          onClick={() => setRulesVisible(true)}
        />
        <Image
          src={require('assets/images/header-setting.png')}
          alt=""
          className={styles.menu__setting}
          onClick={handleSetting}
        />
      </div>
      <CommonModal open={settingModalVisible} title="Setting" onCancel={handleCancel} className={styles.settingModal}>
        <div className="mt-2 px-4">
          <CommonBtn title="Game Record" onClick={handleRecord} className="mb-4"></CommonBtn>
          <CommonBtn title="Lock" onClick={handleLock} className="mb-4"></CommonBtn>
          <CommonBtn title="Exit Game" onClick={handleExit}></CommonBtn>
        </div>
      </CommonModal>
      <CommonModal
        open={rulesVisible}
        title="Game Rules"
        onCancel={() => {
          setRulesVisible(false);
        }}
        className={styles.rulesModal}>
        <div className="h-[312px] overflow-auto text-left text-base leading-6">
          <p>1.Game Start: Each player initially has 1,500 yuan as an asset or 15,000 yuan as an asset.</p>
          <p>
            2.Roll Dice: Roll two dice at the same time each time. if the two dice have the same number of points, you
            can roll one more time. If you are imprisoned in this turn, the extra turn will be cancelled. Directly
            imprisoned for three consecutive identical points.
          </p>
          <p> 3.Game Start: Each player initially has 1,500 yuan as an asset or 15,000 yuan as an asset.</p>
        </div>
        <CommonBtn
          title="I know"
          className="mx-3 mt-6"
          onClick={() => {
            setRulesVisible(false);
          }}></CommonBtn>
      </CommonModal>
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
    </div>
  );
}
