import { did, TelegramPlatform } from '@portkey/did-ui-react';
import { ChainId } from '@portkey/provider-types';
import { store } from 'redux/store';
import {
  setLoginStatus,
  setIsNeedSyncAccountInfo,
  setPlayerInfo,
  setWalletInfo,
  setWalletType,
} from 'redux/reducer/info';
import { setChessboardResetStart, setChessboardTotalStep, setCurChessboardNode } from 'redux/reducer/chessboardData';
import { LoginStatus } from 'redux/types/reducerTypes';
import { KEY_NAME, PORTKEY_LOGIN_CHAIN_ID_KEY, PORTKEY_LOGIN_SESSION_ID_KEY } from 'constants/platform';
import { WalletType } from 'types/index';
import ContractRequest from 'contract/contractRequest';
import { DEFAULT_PIN } from 'constants/login';
import { ETransferConfig, WalletTypeEnum } from '@etransfer/ui-react';

export const getOriginChainIdKeyName = () => {
  return TelegramPlatform.isTelegramPlatform() ? `${KEY_NAME}-${TelegramPlatform.getTelegramUserId()}` : KEY_NAME;
};

export const getOriginChainIdByStorage = () => {
  const keyName = getOriginChainIdKeyName();

  return localStorage.getItem(keyName);
};

export const handleSDKLogout = async () => {
  const originChainId = getOriginChainIdByStorage();
  if (originChainId) {
    try {
      const keyName = TelegramPlatform.isTelegramPlatform()
        ? `${KEY_NAME}-${TelegramPlatform.getTelegramUserId()}`
        : KEY_NAME;
      await did.load(DEFAULT_PIN, keyName);
      await did.logout({
        chainId: originChainId as ChainId,
      });
      did.reset();
    } catch (error) {
      console.error('portkey: error', error);
    }
  }
  window.localStorage.removeItem(KEY_NAME);

  ETransferConfig.setConfig({
    accountInfo: {
      accounts: {},
      walletType: WalletTypeEnum.unknown,
    },
  });

  store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
  store.dispatch(setWalletInfo(null));
  store.dispatch(setWalletType(WalletType.unknown));
  store.dispatch(setPlayerInfo(null));
  store.dispatch(setCurChessboardNode(null));
  store.dispatch(setChessboardResetStart(true));
  store.dispatch(setChessboardTotalStep(0));
  store.dispatch(setIsNeedSyncAccountInfo(true));
  window.localStorage.removeItem(getOriginChainIdKeyName());
  window.localStorage.removeItem(PORTKEY_LOGIN_SESSION_ID_KEY);
  ContractRequest.get().resetConfig();
};

export const handleSDKLogoutOffChain = () => {
  window.localStorage.removeItem(KEY_NAME);
  store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
  store.dispatch(setWalletInfo(null));
  store.dispatch(setWalletType(WalletType.unknown));
  store.dispatch(setPlayerInfo(null));
  store.dispatch(setCurChessboardNode(null));
  store.dispatch(setChessboardResetStart(true));
  store.dispatch(setChessboardTotalStep(0));
  store.dispatch(setIsNeedSyncAccountInfo(true));
  window.localStorage.removeItem(getOriginChainIdKeyName());
  window.localStorage.removeItem(PORTKEY_LOGIN_SESSION_ID_KEY);
  ContractRequest.get().resetConfig();
};
