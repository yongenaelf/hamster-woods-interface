import { IPortkeyProvider } from '@portkey/provider-types';

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

export interface IContractError extends Error {
  code?: number;
  error?: number;
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

export interface IContractOptions {
  chain?: Chain | null;
  type?: ContractMethodType;
}

export interface ISendResult {
  TransactionId: string;
  TransactionResult: string;
}

export type Step1StyleType = 'input-form' | 'qrcode-box';

export type SignInDesignType = 'Web2Design' | 'SocialDesign' | 'CryptoDesign';

export type SocialLoginType = 'Google' | 'Apple';

export interface IAccountInfoSync {
  accountType: string;
  authenticationInfo?: {
    googleAccessToken?: string;
  };
  chainId: SupportedELFChainId;
  isLoginGuardian: boolean;
}

export type ChainIdType = 'AELF' | 'tDVV' | 'tDVW';
export type AccountsType = {
  [key in ChainIdType]?: string[];
};

export interface IDiscoverInfo {
  address: string;
  nickName: string;
  provider: IPortkeyProvider;
  accounts: ChainIdType;
}
