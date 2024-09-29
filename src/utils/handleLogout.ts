import { did } from '@portkey/did-ui-react';
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

export const handleSDKLogout = async () => {
  const originChainId = localStorage.getItem(PORTKEY_LOGIN_CHAIN_ID_KEY);
  if (originChainId) {
    try {
      await did.load(DEFAULT_PIN, KEY_NAME);
      await did.logout({
        chainId: originChainId as ChainId,
      });
      did.reset();
    } catch (error) {
      console.error('portkey: error', error);
    }
  }
  window.localStorage.removeItem(KEY_NAME);
  console.log('wfs setLoginStatus=>13');
  store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
  store.dispatch(setWalletInfo(null));
  store.dispatch(setWalletType(WalletType.unknown));
  store.dispatch(setPlayerInfo(null));
  store.dispatch(setCurChessboardNode(null));
  store.dispatch(setChessboardResetStart(true));
  store.dispatch(setChessboardTotalStep(0));
  store.dispatch(setIsNeedSyncAccountInfo(true));
  window.localStorage.removeItem(PORTKEY_LOGIN_CHAIN_ID_KEY);
  window.localStorage.removeItem(PORTKEY_LOGIN_SESSION_ID_KEY);
  ContractRequest.get().resetConfig();
};
