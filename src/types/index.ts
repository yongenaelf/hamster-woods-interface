import { DIDWalletInfo, IVerifyInfo, TVerifierItem } from '@portkey/did-ui-react';
import { Accounts } from '@portkey/provider-types';
import type { Manager } from '@portkey/services';

export type TokenInfo = {
  decimals: number;
  symbol: string;
  tokenName?: string;
  address?: string;
  issueChainId?: number;
  issuer?: string;
  isBurnable?: boolean;
  totalSupply?: number;
};

export enum SupportedELFChainId {
  MAIN_NET = 'AELF',
  TDVV_NET = 'tDVV',
  TDVW_NET = 'tDVW',
}

export enum ContractMethodType {
  SEND = 'send',
  VIEW = 'view',
}

export enum SocialLoginType {
  APPLE = 'Apple',
  GOOGLE = 'Google',
}

export interface IContractError extends Error {
  code?: number;
  error?:
    | number
    | string
    | {
        message?: string;
      };
  errorMessage?: {
    message: string;
    name?: string;
    stack?: string;
  };
  Error?: string;
  from?: string;
  sid?: string;
  result?: {
    TransactionId?: string;
    transactionId?: string;
  };
  TransactionId?: string;
  transactionId?: string;
  value?: any;
}

export interface ISendResult {
  TransactionId: string;
  TransactionResult: string;
}

export type Step1StyleType = 'input-form' | 'qrcode-box';

export type SignInDesignType = 'Web2Design' | 'SocialDesign' | 'CryptoDesign';

export interface IAccountInfoSync {
  [key: string]: any;
}

export type ChainIdType = 'AELF' | 'tDVV' | 'tDVW';
export type AccountsType = {
  [key in ChainIdType]?: string[];
};

export interface IDiscoverInfo {
  address?: string;
  nickName?: string;
  accounts?: Accounts;
}

export enum OperationTypeEnum {
  // unknown
  unknown = 0,
  // register
  register = 1,
  // community recovery
  communityRecovery = 2,
  // add guardian
  addGuardian = 3,
  // delete guardian
  deleteGuardian = 4,
  // edit guardian
  editGuardian = 5,
  // remove other manager
  removeOtherManager = 6,
  // set login account
  setLoginAccount = 7,
}

export type TSignUpVerifier = { verifier: TVerifierItem } & IVerifyInfo;

export interface CallContractParams<T> {
  contractAddress: string;
  methodName: string;
  args: T;
}

export interface IBoutInformation {
  score: number;
  playId: number;
  roundNumber: number;
  gridNum: number;
  expectedBlockHeight: number;
}

export interface IPlayerInformation {
  playableCount: number;
  sumScore: number;
  curGridNum: number;
}
export enum WalletType {
  unknown = 'unknown',
  discover = 'discover',
  portkey = 'portkey',
}

export type PortkeyInfoType = DIDWalletInfo & { accounts?: { [key: string]: any } };

export type WalletInfoType = {
  portkeyInfo?: PortkeyInfoType;
  discoverInfo?: IDiscoverInfo;
  accountInfoSync?: Array<Manager>;
};

export enum BeanPassResons {
  Claimed = 'Claimed',
  InsufficientElfAmount = 'InsufficientElfAmount',
  DoubleClaim = 'DoubleClaim”',
}

export interface IBeanPassClaimRes {
  claimable: boolean;
  reason: BeanPassResons;
}

export interface IBeanPassClaimReq {
  caAddress: string;
}

export interface IGameSetting {
  dailyMaxPlayCount: number;
  dailyPlayCountResetHours: number;
}
