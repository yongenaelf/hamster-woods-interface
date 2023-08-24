import Image from 'next/image';
import styles from './styles.module.css';
import { useCallback, useState } from 'react';
import CommonModal from 'components/CommonModal';
import CommonBtn from 'components/CommonBtn';
import { useRouter } from 'next/navigation';
import { KEY_NAME, LOGIN_EARGLY_KEY } from 'constants/platform';
import { dispatch, store } from 'redux/store';
import { setLoginStatus, toggleShowGameRecord } from 'redux/reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types/index';
export default function Setting() {
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  const { walletType } = useGetState();

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
    store.dispatch(setLoginStatus(LoginStatus.LOCK));
  }, [walletType]);

  const handleExit = () => {
    window.localStorage.removeItem(KEY_NAME);
    window.localStorage.removeItem(LOGIN_EARGLY_KEY);
    store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
    router.push('/login');
  };
  return (
    <>
      <Image
        src={require('assets/images/header-setting.png')}
        alt=""
        className={styles.setting}
        onClick={handleSetting}
      />
      <CommonModal open={settingModalVisible} title="Setting" onCancel={handleCancel} className={styles.settingModal}>
        <div className="mt-2 px-4">
          <CommonBtn
            title="Game Record"
            onClick={handleRecord}
            className="mx-auto mb-4 md:mb-[24.5px] md:!h-[77.5px] md:!w-[360px] md:!rounded-[38.75px] md:!text-[32px] md:!leading-[77.5px]"></CommonBtn>
          {walletType !== WalletType.discover && (
            <CommonBtn
              title="Lock"
              onClick={handleLock}
              className="mx-auto mb-4 md:mb-[24.5px] md:!h-[77.5px] md:!w-[360px]  md:!rounded-[38.75px]  md:!text-[32px] md:!leading-[77.5px]"></CommonBtn>
          )}
          <CommonBtn
            title="Exit Game"
            onClick={handleExit}
            className="mx-auto !bg-[#F75D56] md:!h-[77.5px]  md:!w-[360px] md:!rounded-[38.75px]  md:!text-[32px] md:!leading-[77.5px]"></CommonBtn>
        </div>
      </CommonModal>
    </>
  );
}
