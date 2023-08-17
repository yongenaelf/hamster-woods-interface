import {
  useSignHandler,
  DIDWalletInfo,
  IGuardianIdentifierInfo,
  TStep1LifeCycle,
  TStep2SignInLifeCycle,
  socialLoginAuth,
  SignIn,
  did,
  ConfigProvider,
  Unlock,
  TStep3LifeCycle,
  TStep2SignUpLifeCycle,
  handleErrorMessage,
  errorTip,
  setLoading,
} from '@portkey/did-ui-react';
import { Drawer } from 'antd';
import detectProvider from '@portkey/detect-provider';
import { isMobileDevices } from 'utils/isMobile';
import { IPortkeyProvider } from '@portkey/provider-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { setAccountInfoSync, setDiscoverInfo, setLoginStatus, setWalletInfo } from 'redux/reducer/info';
import { store } from 'redux/store';
import { LoginStatus } from 'redux/types/reducerTypes';
import getAccountInfoSync from 'utils/getAccountInfoSync';
import isMobile from 'utils/isMobile';
import isPortkeyApp from 'utils/inPortkeyApp';
import { Network, ChainId, portKeyExtensionUrl } from 'constants/platform';
import { SignInDesignType, SocialLoginType, AccountsType, OperationTypeEnum, TSignUpVerifier } from 'types/index';
import useLogin from 'hooks/useLogin';
import { Store } from 'utils/store';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import { useDebounceFn } from 'ahooks';
import openPageInDiscover from 'utils/openDiscoverPage';
import { sleep } from 'utils/common';
import useVerifier from 'hooks/useVarified';
import ContractRequest from 'contract/contractRequest';
import { WalletType } from 'constants/index';
import { GetPlayerInformation } from 'contract/bingo';

const KEY_NAME = 'BEANGOTOWN';

ConfigProvider.setGlobalConfig({
  storageMethod: new Store(),
  requestDefaults: {
    baseURL: '/portkey',
  },
  graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
});

export default function Login() {
  const signInRef = useRef<{ setOpen: Function }>(null);

  const [style, setStyle] = useState<string>(styles.inputForm);

  const [design, setDesign] = useState<SignInDesignType>('Web2Design');

  const [currentLifeCircle, setCurrentLifeCircle] = useState<
    TStep2SignInLifeCycle | TStep1LifeCycle | TStep3LifeCycle | TStep2SignUpLifeCycle
  >({
    LoginByScan: undefined,
  });

  const isInAndroid = isMobile().android.device;

  // const { isLock, isLogin } = useLogin();

  const router = useRouter();

  const isInIOS = isMobile().apple.device;

  const isInApp = isPortkeyApp();

  const [isWalletExist, setIsWalletExist] = useState(false);

  const handleSocialStep1Success = async (value: IGuardianIdentifierInfo) => {
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

  const handleGoogle = async () => {
    setVisible(false);
    const res = await getSocialToken({ type: SocialLoginType.GOOGLE });
    await signHandle.onSocialFinish({
      type: res.provider,
      data: { accessToken: res.token },
    });
  };

  const handleApple = async () => {
    setVisible(false);
    const res = await getSocialToken({ type: SocialLoginType.APPLE });
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

  const { run: handlePortKey } = useDebounceFn(
    async () => {
      if (isMobileDevices() && !isInApp) {
        openPageInDiscover();
        return;
      }
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
        return;
      }
      accounts = await provider?.request({ method: 'requestAccounts' });
      if (accounts[ChainId] && accounts[ChainId].length > 0) {
        onAccountsSuccess(provider, accounts);
      } else {
        console.log('account error');
      }
    },
    {
      wait: 500,
      maxWait: 500,
      leading: true,
      trailing: false,
    },
  );

  const initializeContract = async (wallet: any) => {
    const contract = ContractRequest.get();
    const config = {
      chainId: ChainId,
      rpcUrl: 'https://soho-test2-node-sidechain.aelf.io',
    };
    contract.setWallet(wallet, WalletType.discover);
    contract.setConfig(config);

    const information = await GetPlayerInformation(wallet.address);
    console.log(information);
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

    const walletInfo = {
      address,
      accounts,
      nickName,
      provider,
    };
    store.dispatch(setDiscoverInfo(walletInfo));
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    initializeContract(walletInfo);

    router.push('/');
  }, []);

  useEffect(() => {
    if (typeof window !== undefined && window.localStorage.getItem(KEY_NAME)) {
      setIsWalletExist(true);
    }
  }, []);

  const handleEmail = () => {
    setVisible(false);
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
    setTimeout(() => {
      (document.getElementsByClassName('portkey-ant-segmented-item')?.[1] as HTMLElement)?.click();
    }, 1000);
  };

  const handlePhone = () => {
    setVisible(false);
    setStyle(styles.inputForm);
    setDesign('Web2Design');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const handleQrcode = () => {
    setVisible(false);
    setStyle(styles.qrcodeBox);
    setDesign('SocialDesign');
    setCurrentLifeCircle({ LoginByScan: undefined });
    signInRef.current?.setOpen(true);
  };

  const handleFinish = async (wallet: DIDWalletInfo) => {
    console.log('wallet', wallet);
    store.dispatch(setWalletInfo(wallet));
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    did.save(wallet.pin, KEY_NAME);
    const accountInfoSync = await getAccountInfoSync(ChainId, wallet);
    console.log(accountInfoSync);
    store.dispatch(setAccountInfoSync(accountInfoSync));
    router.push('/');
  };

  const [visible, setVisible] = useState(false);

  const [isUnlockShow, setIsUnlockShow] = useState(false);

  const [passwordValue, setPasswordValue] = useState('');

  const [isErrorTipShow, setIsErrorTipShow] = useState(false);

  const renderLoginMethods = (inModel: boolean) => {
    const allMethods = [
      { name: 'Login with Portkey', onclick: handlePortKey },
      { name: 'Login with Google', onclick: handleGoogle, yellowColor: !inModel ? true : undefined },
      { name: 'Login with Apple', onclick: handleApple, yellowColor: !inModel ? true : undefined },
      { name: 'Login with Email', onclick: handleEmail },
      { name: 'Login with Phone', onclick: handlePhone },
      { name: 'Login with QR code', onclick: handleQrcode },
    ];
    let filterMethods = [];
    if (isInApp) {
      filterMethods = [allMethods[2]];
    } else if (isInIOS) {
      filterMethods = inModel ? [allMethods[1], ...allMethods.slice(3, 6)] : [allMethods[0], allMethods[2]];
    } else {
      filterMethods = inModel ? [allMethods[2], ...allMethods.slice(3, 6)] : [allMethods[0], allMethods[1]];
    }
    return filterMethods.map((item, index) => (
      <div key={index} onClick={item.onclick} className={item?.yellowColor ? styles.loginBtnYellow : styles.loginBtn}>
        {item.name}
      </div>
    ));
  };

  const unlock = useCallback(async () => {
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
    const updateWallet = {
      caInfo: { ...wallet.didWallet.caInfo[ChainId] },
      pin: '',
      walletInfo: wallet.didWallet.managementAccount,
    };
    store.dispatch(setWalletInfo(updateWallet));
    setIsUnlockShow(false);
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    router.push('/');
  }, [passwordValue, router]);

  const { getRecommendationVerifier, verifySocialToken, sendVerifyCode } = useVerifier();

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

  return (
    <div className={styles.loadingContainer}>
      {isWalletExist ? (
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
