'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import CommonModal from 'components/CommonModal';
import CommonBtn from 'components/CommonBtn';
import { useRouter } from 'next/navigation';
import {
  KEY_NAME,
  LOGIN_EARGLY_KEY,
  PORTKEY_LOGIN_CHAIN_ID_KEY,
  PORTKEY_ORIGIN_CHAIN_ID_KEY,
} from 'constants/platform';
import { dispatch, store } from 'redux/store';
import { setLoginStatus, setPlayerInfo, setWalletInfo, setWalletType, toggleShowGameRecord } from 'redux/reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types/index';
import { did } from '@portkey/did-ui-react';
import { ChainId } from '@portkey/provider-types';
import ContractRequest from 'contract/contractRequest';
export default function Setting() {
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  const { walletType, isMobile } = useGetState();

  const handleCancel = () => {
    setSettingModalVisible(false);
  };

  const handleRecord = () => {
    dispatch(toggleShowGameRecord());
    setSettingModalVisible(false);
  };

  const handleSetting = () => {
    setSettingModalVisible(true);
  };

  const router = useRouter();

  const handleLock = useCallback(() => {
    if (walletType === WalletType.discover) {
      return;
    }
    ContractRequest.get().resetConfig();
    did.reset();
    store.dispatch(setLoginStatus(LoginStatus.LOCK));
  }, [walletType]);

  const handleExit = async () => {
    if (walletType === WalletType.portkey) {
      window.localStorage.removeItem(KEY_NAME);
      const originChainId = localStorage.getItem(PORTKEY_LOGIN_CHAIN_ID_KEY);
      localStorage.removeItem(PORTKEY_ORIGIN_CHAIN_ID_KEY);
      if (originChainId) {
        try {
          await did.logout({
            chainId: originChainId as ChainId,
          });
        } catch (error) {
          console.error('portkey: error', error);
        }
      }
    } else if (walletType === WalletType.discover) {
      window.localStorage.removeItem(LOGIN_EARGLY_KEY);
    }

    setSettingModalVisible(false);
    store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
    store.dispatch(setWalletInfo(null));
    store.dispatch(setWalletType(WalletType.unknown));
    store.dispatch(setPlayerInfo(null));
    window.localStorage.removeItem(PORTKEY_LOGIN_CHAIN_ID_KEY);
    ContractRequest.get().resetConfig();

    router.push('/login');
  };
  return (
    <>
      <Image
        src={require('assets/images/header-setting.png')}
        alt=""
        className={isMobile ? styles.setting : styles['setting-pc']}
        onClick={handleSetting}
      />
      <CommonModal
        open={settingModalVisible}
        title="Setting"
        onCancel={handleCancel}
        className={`${styles.settingModal} ${isMobile && styles.settingModalMobile}`}>
        <div className="mt-2 px-4">
          <CommonBtn
            title="Game Record"
            onClick={handleRecord}
            className={`${isMobile ? styles.buttonMobile : styles.button} mb-4 mb-[24.5px]`}></CommonBtn>
          {walletType !== WalletType.discover && (
            <CommonBtn
              title="Lock"
              onClick={handleLock}
              className={`${isMobile ? styles.buttonMobile : styles.button} mb-4 mb-[24.5px]`}></CommonBtn>
          )}
          <CommonBtn
            title="Exit Game"
            onClick={handleExit}
            className={`!bg-[#F75D56] ${isMobile ? styles.buttonMobile : styles.button}`}></CommonBtn>
        </div>
      </CommonModal>
    </>
  );
}
