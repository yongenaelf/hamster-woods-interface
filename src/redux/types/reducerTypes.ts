import { DIDWalletInfo } from '@portkey/did-ui-react';
import { IAccountInfoSync, IDiscoverInfo } from 'types';

export type InfoStateType = {
  isMobile?: boolean;
  isSmallScreen?: boolean;
  theme: string | undefined | null;
  baseInfo: {
    rpcUrl?: string;
    identityPoolID?: string;
    // some config
  };
  discoverInfo: IDiscoverInfo | null;
  walletInfo: DIDWalletInfo | null;
  accountInfoSync: IAccountInfoSync | null;
  loginStatus: LoginStatus;
};

export enum LoginStatus {
  UNLOGIN = 1,
  LOGGED = 2,
  LOCK = 3,
}
