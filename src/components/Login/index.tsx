import {
  useSignHandler,
  DIDWalletInfo,
  IGuardianIdentifierInfo,
  TStep1LifeCycle,
  TStep2SignInLifeCycle,
  SignIn,
  did,
  Unlock,
  TStep3LifeCycle,
  TStep2SignUpLifeCycle,
  handleErrorMessage,
  errorTip,
  setLoading,
} from '@portkey/did-ui-react';
import { Drawer, Modal } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { setLoginStatus } from 'redux/reducer/info';
import { store } from 'redux/store';
import { LoginStatus } from 'redux/types/reducerTypes';
import isMobile, { isMobileDevices } from 'utils/isMobile';
import isPortkeyApp from 'utils/inPortkeyApp';
import { ChainId, LOGIN_EARGLY_KEY } from 'constants/platform';
import { SignInDesignType, SocialLoginType, OperationTypeEnum, TSignUpVerifier } from 'types/index';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { sleep } from 'utils/common';
import useVerifier from 'hooks/useVarified';
import { WalletType } from 'constants/index';
import { PortkeyIcon, AppleIcon, QrCodeIcon, PhoneIcon, EmailIcon, GoogleIcon } from 'assets/images/index';
import { CloseIcon } from 'assets/images/index';
import useWebLogin from 'hooks/useWebLogin';
import { KEY_NAME } from 'constants/platform';
import useGetState from 'redux/state/useGetState';

const components = {
  phone: PhoneIcon,
  email: EmailIcon,
  apple: AppleIcon,
  portkey: PortkeyIcon,
  qrcode: QrCodeIcon,
  google: GoogleIcon,
};

type IconType = 'apple' | 'google' | 'portkey' | 'email' | 'phone' | 'qrcode';

export default function Login() {
  const signInRef = useRef<{ setOpen: Function }>(null);

  const [style, setStyle] = useState<string>(styles.inputForm);

  const [design, setDesign] = useState<SignInDesignType>('Web2Design');

  const [currentLifeCircle, setCurrentLifeCircle] = useState<
    TStep2SignInLifeCycle | TStep1LifeCycle | TStep3LifeCycle | TStep2SignUpLifeCycle
  >({
    LoginByScan: undefined,
  });

  const handleSocialStep1Success = async (value: IGuardianIdentifierInfo) => {
    setDrawerVisible(false);
    setModalVisible(false);
    if (!value.isLoginGuardian) {
      await onSignUp(value as IGuardianIdentifierInfo);
    } else {
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
    }
  };

  const signHandle = useSignHandler({
    onSuccess: handleSocialStep1Success,
    defaultChainId: ChainId,
    customValidateEmail: undefined,
    customValidatePhone: undefined,
    onChainIdChange: undefined,
    onError: undefined,
  });

  const { isLogin, handlePortKey, handleFinish, handleApple, handleGoogle, loginEagerly } = useWebLogin({
    signHandle,
  });

  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin, router]);

  const { isLock } = useGetState();

  const isInIOS = isMobile().apple.device;

  const isInApp = isPortkeyApp();

  const [_isWalletExist, setIsWalletExist] = useState(false);

  useEffect(() => {
    if (isLock) {
      return;
    }
    if (typeof window !== undefined) {
      if (window.localStorage.getItem(LOGIN_EARGLY_KEY)) {
        loginEagerly();
        return;
      }
      if (window.localStorage.getItem(KEY_NAME)) {
        setIsWalletExist(true);
      }
    }
  }, [isLock, loginEagerly]);

  const handleEmail = () => {
    closeModal();
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
    setTimeout(() => {
      (document.getElementsByClassName('portkey-ant-segmented-item')?.[1] as HTMLElement)?.click();
    }, 1000);
  };

  const closeModal = () => {
    setDrawerVisible(false);
    setModalVisible(false);
  };

  const handlePhone = () => {
    closeModal();
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const handleQrcode = () => {
    closeModal();
    setStyle(styles.qrcodeBox);
    setDesign('SocialDesign');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [isUnlockShow, setIsUnlockShow] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');

  const [_isErrorTipShow, setIsErrorTipShow] = useState(false);

  const renderLoginMethods = (inModel: boolean) => {
    const allMethods = [
      { name: 'Login with Portkey', onclick: handlePortKey, iconName: 'portkey' },
      {
        name: 'Login with Google',
        onclick: handleGoogle,
        yellowColor: !inModel ? true : undefined,
        iconName: 'google',
      },
      { name: 'Login with Apple', onclick: handleApple, yellowColor: !inModel ? true : undefined, iconName: 'apple' },
      { name: 'Login with Email', onclick: handleEmail, iconName: 'email' },
      { name: 'Login with Phone', onclick: handlePhone, iconName: 'phone' },
      { name: 'Login with QR code', onclick: handleQrcode, iconName: 'qrcode' },
    ];
    let filterMethods = [];
    if (isInApp) {
      filterMethods = [allMethods[0]];
    } else if (isInIOS) {
      filterMethods = inModel ? [allMethods[1], ...allMethods.slice(3, 6)] : [allMethods[0], allMethods[2]];
    } else {
      filterMethods = inModel ? [allMethods[2], ...allMethods.slice(3, 6)] : [allMethods[0], allMethods[1]];
    }
    return filterMethods.map((item, index) => (
      <div key={index} onClick={item.onclick} className={item?.yellowColor ? styles.loginBtnYellow : styles.loginBtn}>
        {getIconComponent(item.iconName as IconType, inModel)} {item.name}
      </div>
    ));
  };

  const renderMoreContent = () => {
    return (
      <>
        <div className={styles.drawerHeader}>
          Login method
          {
            <CloseIcon
              className={styles.drawer__close}
              onClick={() => {
                closeModal();
              }}
            />
          }
        </div>
        {renderLoginMethods(true)}
      </>
    );
  };

  const getIconComponent = (name: IconType, inModel: boolean) => {
    const Con = components[name] || null;
    return <Con className={inModel ? styles.loginBtnBlueIcon : styles.loginBtnIcon} />;
  };

  const unlock = useCallback(async () => {
    //need some code
    setIsUnlockShow(true);
    let wallet;
    try {
      wallet = await did.load(passwordValue, KEY_NAME);
    } catch (err) {
      console.log(err);
      return;
    }
    console.log('wallet', wallet);
    if (!wallet.didWallet.accountInfo.loginAccount) {
      setIsErrorTipShow(true);
      return;
    }
    setIsUnlockShow(false);
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    router.push('/');
  }, [passwordValue, router]);

  const { getRecommendationVerifier, verifySocialToken } = useVerifier();

  const onStep2OfSignUpFinish = useCallback((res: TSignUpVerifier, value?: IGuardianIdentifierInfo) => {
    const identifier = value;
    if (!identifier) return console.error('No guardianIdentifier!');
    const list = [
      {
        type: identifier?.accountType,
        identifier: identifier?.identifier,
        verifierId: res.verifier.id,
        verificationDoc: res.verificationDoc,
        signature: res.signature,
      },
    ];
    console.log(list);
    setCurrentLifeCircle({
      SetPinAndAddManager: {
        guardianIdentifierInfo: identifier,
        approvedList: list,
      },
    });
    setTimeout(() => {
      signInRef.current?.setOpen(true);
    }, 500);
  }, []);

  const onSignUp = useCallback(
    async (value: IGuardianIdentifierInfo) => {
      try {
        setLoading(true, 'Assigning a verifier on-chain…');
        await sleep(2000);
        const verifier = await getRecommendationVerifier(ChainId);
        setLoading(false);
        const { accountType, authenticationInfo, identifier } = value;
        if (accountType === SocialLoginType.APPLE || accountType === SocialLoginType.GOOGLE) {
          setLoading(true);
          console.log('authenticationInfo', authenticationInfo);
          const result = await verifySocialToken({
            accountType,
            token: authenticationInfo?.appleIdToken || authenticationInfo?.googleAccessToken,
            guardianIdentifier: identifier,
            verifier,
            chainId: ChainId,
            operationType: OperationTypeEnum.register,
          });
          setLoading(false);
          console.log(result);
          onStep2OfSignUpFinish(
            {
              verifier,
              verificationDoc: result.verificationDoc,
              signature: result.signature,
            },
            value,
          );
        }
      } catch (error) {
        setLoading(false);
        const errorMsg = handleErrorMessage(error);
        errorTip(
          {
            errorFields: 'Check sign up',
            error: errorMsg,
          },
          true,
          () => {
            console.log('error');
          },
        );
      }
    },
    [getRecommendationVerifier, onStep2OfSignUpFinish, verifySocialToken],
  );

  const handlePortKeyLoginFinish = useCallback(
    (wallet: DIDWalletInfo) => {
      handleFinish(WalletType.portkey, wallet);
    },
    [handleFinish],
  );

  const setModalOpen = () => {
    if (isMobileDevices()) {
      setDrawerVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {isLock ? (
        <div onClick={unlock} className={styles.unlockBtn}>
          unLock
        </div>
      ) : (
        <>
          {renderLoginMethods(false)}
          {!isInApp && (
            <div
              className={styles.more}
              onClick={() => {
                setModalOpen();
              }}>
              More
            </div>
          )}
        </>
      )}

      <Drawer
        open={drawerVisible}
        placement={'bottom'}
        className={styles.loginMethodDrawer}
        onClose={() => {
          closeModal();
        }}
        maskClosable={true}>
        {renderMoreContent()}
      </Drawer>

      <Modal
        open={modalVisible}
        className={styles.loginMethodModal}
        onCancel={() => closeModal()}
        maskClosable={true}
        closable={false}>
        {renderMoreContent()}
      </Modal>

      <SignIn
        ref={signInRef}
        design={design}
        defaultLifeCycle={currentLifeCircle}
        className={style}
        onFinish={handlePortKeyLoginFinish}
        isShowScan={true}
        defaultChainId={ChainId}
      />

      <Unlock
        onUnlock={unlock}
        open={isUnlockShow}
        onCancel={() => {
          setIsUnlockShow(false);
        }}
        value={passwordValue}
        onChange={(v) => {
          setIsErrorTipShow(false);
          setPasswordValue(v);
        }}
        isWrongPassword={true}
      />
    </div>
  );
}
