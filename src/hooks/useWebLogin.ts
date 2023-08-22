import { useCallback, useEffect, useState } from 'react';
import { isMobileDevices } from 'utils/isMobile';
import { ChainId, LOGIN_EARGLY_KEY, Network, portKeyExtensionUrl } from 'constants/platform';
import { IPortkeyProvider } from '@portkey/provider-types';
import detectProvider from '@portkey/detect-provider';
import {
  selectInfo,
  setAccountInfoSync,
  setLoginStatus,
  setPlayerInfo,
  setWalletInfo,
  setWalletType,
} from 'redux/reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';
import { store, useSelector } from 'redux/store';
import { AccountsType, IDiscoverInfo, SocialLoginType, WalletType, PortkeyInfoType, WalletInfoType } from 'types';
import { did, socialLoginAuth } from '@portkey/did-ui-react';
import isPortkeyApp from 'utils/inPortkeyApp';
import openPageInDiscover from 'utils/openDiscoverPage';
import getAccountInfoSync from 'utils/getAccountInfoSync';
import ContractRequest from 'contract/contractRequest';
import { CheckBeanPass, GetPlayerInformation } from 'contract/bingo';
import { SignatureParams } from 'aelf-web-login';
import useGetState from 'redux/state/useGetState';

const KEY_NAME = 'BEANGOTOWN';

export type DiscoverDetectState = 'unknown' | 'detected' | 'not-detected';

export default function useWebLogin({ signHandle }: { signHandle?: any }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginStatus } = useSelector(selectInfo);
  const [wallet, setWallet] = useState<WalletInfoType | null>(null);
  const [curWalletType, setCurWalletType] = useState<WalletType>(WalletType.unknown);

  const [discoverProvider, setDiscoverProvider] = useState<IPortkeyProvider>();
  const [discoverDetected, setDiscoverDetected] = useState<DiscoverDetectState>('unknown');

  const [discoverInfo, setDiscoverInfo] = useState<IDiscoverInfo>();

  const [didWalletInfo, setDidWalletInfo] = useState<PortkeyInfoType>();

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

  const { walletInfo, walletType } = useGetState();

  const initializeContract = useCallback(async () => {
    const contract = ContractRequest.get();
    const config = {
      chainId: ChainId,
      rpcUrl: process.env.NEXT_PUBLIC_RPC_SERVER,
    };
    contract.setWallet(walletInfo, walletType);
    contract.setConfig(config);

    let address = '';

    console.log(walletType);

    if (walletType === WalletType.discover) {
      address = walletInfo?.discoverInfo?.address || '';
    } else if (walletType === WalletType.portkey) {
      address = walletInfo?.portkeyInfo?.caInfo.caAddress || '';
    } else {
      console.log('unknown address');
      return;
    }

    console.log('wallet.address', address);

    try {
      const information = await GetPlayerInformation(address);
      store.dispatch(setPlayerInfo(information));
      console.log(information);
    } catch (error) {
      /* empty */
    }
  }, [walletInfo, walletType]);

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
    store.dispatch(setWalletType(type));

    if (type === WalletType.discover) {
      localStorage.setItem(LOGIN_EARGLY_KEY, 'true');
      setDiscoverInfo(walletInfo);
      setWallet({ discoverInfo: walletInfo as IDiscoverInfo });
      setCurWalletType(type);
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
      setDidWalletInfo(walletInfo as PortkeyInfoType);
      setWallet({
        portkeyInfo: walletInfo as PortkeyInfoType,
        accountInfoSync: accountInfoSync,
      });
      setCurWalletType(type);
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

  const getDiscoverSignature = useCallback(
    async (params: SignatureParams) => {
      // checkSignatureParams(params);
      if (!discoverInfo) {
        throw new Error('Discover not connected');
      }
      const provider = discoverProvider! as IPortkeyProvider;
      const signInfo = params.signInfo;
      const signedMsgObject = await provider.request({
        method: 'wallet_getSignature',
        payload: {
          data: signInfo || params.hexToBeSign,
        },
      });
      const signedMsgString = [
        signedMsgObject.r.toString(16, 64),
        signedMsgObject.s.toString(16, 64),
        `0${signedMsgObject.recoveryParam!.toString()}`,
      ].join('');
      return {
        error: 0,
        errorMessage: '',
        signature: signedMsgString,
        from: 'discover',
      };
    },
    [discoverInfo, discoverProvider],
  );

  const getPortKeySignature = useCallback(
    async (params: SignatureParams) => {
      // checkSignatureParams(params);
      if (!didWalletInfo) {
        throw new Error('Portkey not login');
      }
      let signInfo = '';
      if (params.hexToBeSign) {
        signInfo = params.hexToBeSign;
      } else {
        signInfo = params.signInfo;
      }
      const signature = did.sign(signInfo).toString('hex');
      return {
        error: 0,
        errorMessage: '',
        signature,
        from: 'portkey',
      };
    },
    [didWalletInfo],
  );

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
    initializeContract,
    getDiscoverSignature,
    getPortKeySignature,
  };
}
