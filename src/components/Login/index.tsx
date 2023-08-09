import {
  useSignHandler,
  DIDWalletInfo,
  IGuardianIdentifierInfo,
  TStep1LifeCycle,
  TStep2SignInLifeCycle,
  socialLoginAuth,
  SignIn,
  did,
} from '@portkey/did-ui-react';
import { Button, Drawer, Modal, Image, Input } from 'antd';
import detectProvider from '@portkey/detect-provider';
import { isMobileDevices } from 'utils/isMobile';
import { IPortkeyProvider } from '@portkey/provider-types';
import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { setAccountInfoSync, setDiscoverInfo, setLoginStatus, setWalletInfo } from 'redux/reducer/info';
import { store } from 'redux/store';
import { LoginStatus } from 'redux/types/reducerTypes';
import getAccountInfoSync from 'utils/getAccountInfoSync';
import isMobile from 'utils/isMobile';
import isPortkeyApp from 'utils/inPortkeyApp';
import { Network, ChainId, portKeyExtensionUrl } from 'constants/platform';
import { SignInDesignType, SocialLoginType, AccountsType } from 'types/index';
import useLogin from 'hooks/useLogin';
import styles from './style.module.css';

export default function Login() {
  const signInRef = useRef<{ setOpen: Function }>(null);

  const [style, setStyle] = useState<string>(styles.inputForm);

  const [design, setDesign] = useState<SignInDesignType>('Web2Design');

  const [currentLifeCircle, setCurrentLifeCircle] = useState<TStep2SignInLifeCycle | TStep1LifeCycle>({
    LoginByScan: undefined,
  });

  const isInAndroid = isMobile().android.device;

  const { isLock, isLogin } = useLogin();

  const isInIOS = isMobile().apple.device;

  const isInApp = isPortkeyApp();

  const handleSocialStep1Success = (value: IGuardianIdentifierInfo) => {
    setCurrentLifeCircle({
      GuardianApproval: {
        guardianIdentifierInfo: {
          chainId: value.chainId,
          isLoginGuardian: value.isLoginGuardian,
          identifier: value.identifier,
          accountType: value.accountType,
        },
      },
    });
    setTimeout(() => {
      signInRef.current?.setOpen(true);
    }, 500);
  };

  const signHandle = useSignHandler({
    onSuccess: handleSocialStep1Success,
    defaultChainId: ChainId,
    customValidateEmail: undefined,
    customValidatePhone: undefined,
    onChainIdChange: undefined,
    onError: undefined,
  });

  const handleGoogle = async () => {
    const res = await getSocialToken({ type: 'Google' });
    await signHandle.onSocialFinish({
      type: res.provider,
      data: { accessToken: res.token },
    });
  };

  const handleApple = async () => {
    const res = await getSocialToken({ type: 'Apple' });
    await signHandle.onSocialFinish({
      type: res.provider,
      data: { accessToken: res.token },
    });
  };

  const getSocialToken = async ({
    type,
    clientId = '',
    redirectURI = '',
  }: {
    type: SocialLoginType;
    clientId?: string;
    redirectURI?: string;
  }) => {
    const tokenRes = await socialLoginAuth({
      type,
      clientId,
      redirectURI,
    });
    return tokenRes;
  };

  const handlePortKey = async () => {
    if (!window?.portkey && !isMobileDevices()) {
      window?.open(portKeyExtensionUrl, '_blank')?.focus();
      return;
    }
    const provider: IPortkeyProvider | null = await detectProvider();
    if (!provider) {
      console.log('unknow');
      return;
    }
    const network = await provider?.request({ method: 'network' });
    if (network !== Network) {
      console.log('network error');
      return;
    }
    let accounts = await provider?.request({ method: 'accounts' });
    if (accounts[ChainId] && accounts[ChainId].length > 0) {
      onAccountsSuccess(provider, accounts);
      store.dispatch(setLoginStatus(LoginStatus.LOGGED));
      return;
    }
    accounts = await provider?.request({ method: 'requestAccounts' });
    if (accounts[ChainId] && accounts[ChainId].length > 0) {
      onAccountsSuccess(provider, accounts);
      store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    } else {
      console.log('account error');
    }
  };

  const onAccountsSuccess = useCallback(async (provider: IPortkeyProvider, accounts: AccountsType) => {
    let nickName = 'Wallet 01';
    const address = accounts[ChainId]?.[0].split('_')[1];
    try {
      nickName = await provider.request({ method: 'wallet_getWalletName' });
    } catch (error) {
      console.warn(error);
    }
    // localStorage.setItem(LOGIN_EARGLY_KEY, "true");

    store.dispatch(
      setDiscoverInfo({
        address,
        accounts,
        nickName,
        provider,
      }),
    );
  }, []);

  const handleEmail = () => {
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
    setTimeout(() => {
      (document.getElementsByClassName('portkey-ant-segmented-item')?.[1] as HTMLElement)?.click();
    }, 1000);
  };

  const handlePhone = () => {
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const handleQrcode = () => {
    setStyle(styles.qrcodeBox);
    setDesign('SocialDesign');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const handleFinish = async (wallet: DIDWalletInfo) => {
    console.log('wallet', wallet);
    store.dispatch(setWalletInfo(wallet));
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    const accountInfoSync = await getAccountInfoSync(ChainId, wallet);
    console.log(accountInfoSync);
    store.dispatch(setAccountInfoSync(accountInfoSync));
  };

  const [visible, setVisible] = useState(false);

  const [isUnlockShow, setIsUnlockShow] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');

  const [isErrorTipShow, setIsErrorTipShow] = useState(false);

  const renderLoginMethods = (inModel: boolean) => {
    const allMethods = [
      { name: 'Login with Google', onclick: handleGoogle },
      { name: 'Login with Apple', onclick: handleApple },
      { name: 'Login with Portkey', onclick: handlePortKey },
      { name: 'Login with Email', onclick: handleEmail },
      { name: 'Login with Phone', onclick: handlePhone },
      { name: 'Login with QR code', onclick: handleQrcode },
    ];
    let filterMethods: Array<{ name: string; onclick: MouseEventHandler<HTMLDivElement> }> = [];
    if (isInApp) {
      filterMethods = [allMethods[2]];
    } else if (isInIOS) {
      filterMethods = inModel ? [allMethods[0], ...allMethods.slice(3, 6)] : [allMethods[1], allMethods[2]];
    } else {
      filterMethods = inModel ? [allMethods[1], ...allMethods.slice(3, 6)] : [allMethods[0], allMethods[2]];
    }
    return filterMethods.map((item, index) => (
      <div key={index} onClick={item.onclick} className={styles.loginBtn}>
        {item.name}
      </div>
    ));
  };

  const handleUnLock = () => {
    setIsUnlockShow(true);
  };

  return (
    <div className={styles.loadingContainer}>
      {isLock ? (
        <Button onClick={handleUnLock}>unLock</Button>
      ) : (
        <>
          <div
            onClick={() => {
              store.dispatch(setLoginStatus(LoginStatus.LOCK));
            }}>
            lock
          </div>
          {renderLoginMethods(false)}
          {!isInApp && (
            <div
              className={styles.more}
              onClick={() => {
                setVisible(true);
              }}>
              More
            </div>
          )}
        </>
      )}

      <Drawer
        open={visible}
        placement={'bottom'}
        className={styles.loginMethodDrawer}
        onClose={() => {
          setVisible(false);
        }}
        maskClosable={true}>
        <div className={styles.drawerHeader}>Login method</div>
        {renderLoginMethods(true)}
      </Drawer>

      <SignIn
        ref={signInRef}
        design={design}
        defaultLifeCycle={currentLifeCircle}
        className={style}
        onFinish={handleFinish}
      />

      <Modal
        open={isUnlockShow}
        closable={false}
        centered
        title={null}
        footer={null}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        className={styles.portkeyUnlockModal}
        width={430}
        onCancel={() => {
          setIsUnlockShow(false);
        }}>
        <div className={styles.unlockBody}>
          <Image src="./portkey.svg" alt="" width={88} height={88} />
          <h1>Welcome back!</h1>
          <div className={styles.passwordWrap}>
            <span className={styles.passwordLabel}>Enter Pin</span>
            <Input.Password
              value={passwordValue}
              placeholder="Enter Pin"
              className={styles.passwordInput}
              maxLength={16}
              onChange={(e) => {
                setIsErrorTipShow(false);
                setPasswordValue(e.target.value);
              }}
            />
            <div className={styles.errorTips}>{isErrorTipShow ? 'Incorrect pin' : ''}</div>
          </div>

          <Button disabled={passwordValue.length < 6} className={styles.submitBtn} type="primary">
            Unlock
          </Button>
        </div>
      </Modal>
    </div>
  );
}
