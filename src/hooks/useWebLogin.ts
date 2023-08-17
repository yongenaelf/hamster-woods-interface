import { useCallback, useEffect, useState } from 'react';
import { isMobileDevices } from 'utils/isMobile';
import { ChainId, LOGIN_EARGLY_KEY, Network, portKeyExtensionUrl } from 'constants/platform';
import { IPortkeyProvider } from '@portkey/provider-types';
import detectProvider from '@portkey/detect-provider';
import { selectInfo, setAccountInfoSync, setLoginStatus, setWalletInfo } from 'redux/reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';
import { store, useSelector } from 'redux/store';
import { AccountsType, IDiscoverInfo, SocialLoginType, WalletType, PortkeyInfoType, WalletInfoType } from 'types';
import { did, socialLoginAuth } from '@portkey/did-ui-react';
import isPortkeyApp from 'utils/inPortkeyApp';
import openPageInDiscover from 'utils/openDiscoverPage';
import getAccountInfoSync from 'utils/getAccountInfoSync';

const KEY_NAME = 'BEANGOTOWN';

export type DiscoverDetectState = 'unknown' | 'detected' | 'not-detected';

export default function useWebLogin({ signHandle }: { signHandle: any }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginStatus } = useSelector(selectInfo);
  const [wallet, setWallet] = useState<WalletInfoType | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(WalletType.unknown);

  const [discoverProvider, setDiscoverProvider] = useState<IPortkeyProvider>();
  const [discoverDetected, setDiscoverDetected] = useState<DiscoverDetectState>('unknown');

  const detect = useCallback(async (): Promise<IPortkeyProvider> => {
    if (discoverProvider?.isConnected()) {
      return discoverProvider!;
    }
    let detectProviderFunc = detectProvider;
    if (typeof detectProvider !== 'function') {
      const detectProviderModule = detectProvider as any;
      detectProviderFunc = detectProviderModule.default;
    }
    let provider: IPortkeyProvider | null;
    try {
      provider = await detectProviderFunc();
    } catch (error) {
      setDiscoverDetected('not-detected');
      throw error;
    }
    if (provider) {
      if (!provider.isPortkey) {
        setDiscoverDetected('not-detected');
        throw new Error('Discover provider found, but check isPortkey failed');
      }
      setDiscoverProvider(provider);
      setDiscoverDetected('detected');
      return provider;
    } else {
      setDiscoverDetected('not-detected');
      throw new Error('Discover provider not found');
    }
  }, [discoverProvider]);

  useEffect(() => {
    detect().catch((error: any) => {
      console.log(error.message);
    });
  }, []);

  useEffect(() => {
    setIsLogin(loginStatus === LoginStatus.LOGGED);
  }, [loginStatus]);

  const handlePortKey = useCallback(async () => {
    if (isMobileDevices() && !isPortkeyApp()) {
      openPageInDiscover();
      return;
    }
    if (!window?.portkey && !isMobileDevices()) {
      window?.open(portKeyExtensionUrl, '_blank')?.focus();
      return;
    }

    const provider = await detect();
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
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    const res = await getSocialToken({ type: SocialLoginType.GOOGLE });
    await signHandle.onSocialFinish({
      type: res.provider,
      data: { accessToken: res.token },
    });
  };

  const handleApple = async () => {
    setLoading(true);
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

  const onAccountsSuccess = useCallback(async (provider: IPortkeyProvider, accounts: AccountsType) => {
    let nickName = 'Wallet 01';
    const address = accounts[ChainId]?.[0].split('_')[1];
    console.log('address', address);

    try {
      nickName = await provider.request({ method: 'wallet_getWalletName' });
    } catch (error) {
      console.warn(error);
    }
    const discoverInfo = {
      address,
      accounts,
      nickName,
      provider,
    };
    handleFinish(WalletType.discover, discoverInfo);
  }, []);

  const handleFinish = async (type: WalletType, walletInfo: PortkeyInfoType | IDiscoverInfo) => {
    console.log('wallet', type, walletInfo);
    store.dispatch(setLoginStatus(LoginStatus.LOGGED));
    if (type === WalletType.discover) {
      localStorage.setItem(LOGIN_EARGLY_KEY, 'true');
      setWallet({ discoverInfo: walletInfo as IDiscoverInfo });
      setWalletType(type);
      store.dispatch(
        setWalletInfo({
          discoverInfo: walletInfo,
        }),
      );
    } else if (type === WalletType.portkey) {
      did.save((walletInfo as PortkeyInfoType)?.pin, KEY_NAME);
      const accountInfoSync = await getAccountInfoSync(ChainId, walletInfo as PortkeyInfoType);
      console.log(accountInfoSync);
      store.dispatch(setAccountInfoSync(accountInfoSync));
      setWallet({
        portkeyInfo: walletInfo as PortkeyInfoType,
        accountInfoSync: accountInfoSync,
      });
      setWalletType(type);
      store.dispatch(
        setWalletInfo({
          portkeyInfo: walletInfo,
          accountInfoSync: accountInfoSync,
        }),
      );
    }
  };

  const loginEagerly = useCallback(async () => {
    setLoading(true);
    try {
      const provider = await detect();
      const network = await provider.request({ method: 'network' });
      if (network !== Network) {
        console.log('ERR_CODE.NETWORK_TYPE_NOT_MATCH');
        setLoading(false);
        return;
      }
      const accounts = await provider.request({ method: 'accounts' });
      console.log(accounts);
      if (accounts[ChainId] && accounts[ChainId]!.length > 0) {
        onAccountsSuccess(provider, accounts);
        setLoading(false);
      } else {
        console.log('ERR_CODE.DISCOVER_LOGIN_EAGERLY_FAIL');
        setLoading(false);
      }
    } catch (error: any) {
      console.log({
        code: 10001,
        message: error?.message || 'unknown error',
        nativeError: error,
      });
      setLoading(false);
    }
  }, [onAccountsSuccess]);

  return {
    isLogin,
    loading,
    discoverDetected,
    wallet,
    walletType,
    loginEagerly,
    handlePortKey,
    handleGoogle,
    handleApple,
    handleFinish,
  };
}
