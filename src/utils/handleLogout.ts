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
import { WalletType } from 'types/index';
import ContractRequest from 'contract/contractRequest';
import { DEFAULT_PIN } from 'constants/login';
import { ETransferConfig, WalletTypeEnum } from '@etransfer/ui-react';
import { StorageUtils } from './storage.utils';

export const handleSDKLogout = async () => {
  const originChainId = StorageUtils.getOriginChainId();
  const keyName = StorageUtils.getWalletKey();

  if (originChainId) {
    try {
      await did.load(DEFAULT_PIN, keyName);
      await did.logout({
        chainId: originChainId as ChainId,
      });
      did.reset();
    } catch (error) {
      console.error('portkey: error', error);
    }
  }
  StorageUtils.removeWallet();

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
  StorageUtils.removeOriginChainId();
  StorageUtils.removeSessionStorage();
  ContractRequest.get().resetConfig();
};

export const handleSDKLogoutOffChain = () => {
  StorageUtils.removeWallet();
  store.dispatch(setLoginStatus(LoginStatus.UNLOGIN));
  store.dispatch(setWalletInfo(null));
  store.dispatch(setWalletType(WalletType.unknown));
  store.dispatch(setPlayerInfo(null));
  store.dispatch(setCurChessboardNode(null));
  store.dispatch(setChessboardResetStart(true));
  store.dispatch(setChessboardTotalStep(0));
  store.dispatch(setIsNeedSyncAccountInfo(true));
  StorageUtils.removeOriginChainId();
  StorageUtils.removeSessionStorage();
  ContractRequest.get().resetConfig();
};
