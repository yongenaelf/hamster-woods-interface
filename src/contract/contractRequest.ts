import { WalletType } from 'constants/index';
import { IPortkeyContract, getContractBasic } from '@portkey/contracts';
import { ChainId, IContract, SendOptions } from '@portkey/types';
import { did } from '@portkey/did-ui-react';

import { CallContractParams, IDiscoverInfo, PortkeyInfoType, WalletInfoType } from 'types';
import { getAElfInstance, getViewWallet } from 'utils/contractInstance';
import { aelf } from '@portkey/utils';
import { getTxResult } from 'utils/getTxResult';
import DetectProvider from 'utils/InstanceProvider';

interface IContractConfig {
  chainId: ChainId;
  rpcUrl?: string;
  contractAddress: string;
}

interface IWallet {
  discoverInfo?: IDiscoverInfo;
  portkeyInfo?: PortkeyInfoType;
}

interface IViewContract {
  [props: string]: {
    call: any;
  };
}

export default class ContractRequest {
  private static instance: ContractRequest | null = null;
  private walletType: WalletType = WalletType.unknown;
  private chainId: ChainId | undefined;
  private rpcUrl: string | undefined;
  private wallet: IWallet = {};
  public caContractProvider?: IContract;
  public caContract?: IPortkeyContract;
  public viewContract?: IViewContract;
  private caAddress: string | undefined;
  private caHash: string | undefined;

  static get() {
    if (!ContractRequest.instance) {
      ContractRequest.instance = new ContractRequest();
    }
    return ContractRequest.instance;
  }

  public setConfig(config: IContractConfig) {
    this.chainId = config.chainId;
    this.rpcUrl = config.rpcUrl;
    this.initCaContract(config.contractAddress);
  }

  public resetConfig() {
    this.chainId = undefined;
    this.rpcUrl = undefined;
    this.caContractProvider = undefined;
    this.caContract = undefined;
    this.viewContract = undefined;
    this.caAddress = undefined;
    this.caHash = undefined;
    this.walletType = WalletType.unknown;
    this.wallet = {};
  }

  public setWallet(wallet: WalletInfoType, walletType: WalletType) {
    if (wallet) {
      this.walletType = walletType;
      if (walletType === WalletType.discover) {
        this.wallet.discoverInfo = wallet.discoverInfo;
      } else {
        this.wallet.portkeyInfo = wallet.portkeyInfo;
      }
    }
  }

  public async initCaContract(contractAddress: string) {
    if (this.walletType === WalletType.discover) {
      this.caContractProvider = await this.getProviderCaContract(contractAddress);
    } else {
      this.caContract = await this.getCaContract();
    }

    this.viewContract = await this.getViewContract(contractAddress);
  }

  private getCaContract = async () => {
    if (!this.caContract) {
      const chainsInfo = await did.services.getChainsInfo();
      const chainInfo = chainsInfo.find((chain) => chain.chainId === this.chainId);
      if (!chainInfo) {
        throw new Error(`Chain is not running: ${this.chainId}`);
      }
      const didWalletInfo = this.wallet.portkeyInfo!;
      const account = aelf.getWallet(didWalletInfo?.walletInfo?.privateKey);
      const caContract = await getContractBasic({
        contractAddress: chainInfo.caContractAddress,
        account,
        rpcUrl: this.rpcUrl,
      });
      this.caContract = caContract;

      this.caAddress = didWalletInfo?.walletInfo?.address;
      this.caHash = didWalletInfo?.caInfo?.caHash;
    }
    return this.caContract;
  };

  private getViewContract = async (contractAddress: string) => {
    if (!this.viewContract) {
      const aelfInstance = getAElfInstance(this.rpcUrl!);
      const viewWallet = getViewWallet();

      const contract = await aelfInstance.chain.contractAt(contractAddress, viewWallet);
      this.viewContract = contract;
    }
    return this.viewContract;
  };

  private getProviderCaContract = async (contractAddress: string) => {
    if (!this.caContractProvider) {
      console.log('getProviderCaContract');

      const dp = await DetectProvider.getDetectProvider();
      const chainProvider = await dp?.getChain(this.chainId as ChainId);
      if (!chainProvider) return;
      const contract = await getContractBasic({
        contractAddress: contractAddress,
        chainProvider: chainProvider,
      });
      this.caContractProvider = contract;
      return contract;
    }
    return this.caContractProvider;
  };

  public async callSendMethod<T, R>(params: CallContractParams<T>, sendOptions?: SendOptions) {
    if (this.walletType === WalletType.unknown) {
      throw new Error('Wallet not login');
    }

    let result: R | any;

    const walletType = this.walletType;
    switch (walletType) {
      case WalletType.discover: {
        const discoverInfo = this.wallet.discoverInfo!;
        try {
          const contract = await this.getProviderCaContract(params.contractAddress);
          const accounts = discoverInfo.accounts;

          if (!accounts) {
            throw new Error('Account not found');
          }

          const accountsInChain = accounts[this.chainId as ChainId];
          if (!accountsInChain || accountsInChain.length === 0) {
            throw new Error(`Account not found in chain: ${this.chainId}`);
          }
          const address = accountsInChain[0];
          result = await contract?.callSendMethod(params.methodName, address, params.args, sendOptions);
        } catch (error) {
          console.error('=====callSendMethod error', error);
          return Promise.reject(error);
        }
        break;
      }
      case WalletType.portkey: {
        try {
          result = await this.caContract?.callSendMethod(
            'ManagerForwardCall',
            this.caAddress!,
            {
              caHash: this.caHash,
              contractAddress: params.contractAddress,
              methodName: params.methodName,
              args: params.args,
            },
            { onMethod: 'transactionHash' },
          );
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    if (result?.error || result?.code || result?.Error) {
      return Promise.reject(result);
    }

    const { transactionId, TransactionId } = result.result || result;
    const resTransactionId = TransactionId || transactionId;
    const transaction = await getTxResult(resTransactionId!, this.chainId as ChainId, 0, this.rpcUrl!);

    return Promise.resolve({
      TransactionId: transaction.TransactionId,
      TransactionResult: transaction.txResult,
    });
  }

  public async callViewMethod<T, R>(params: CallContractParams<T>): Promise<R> {
    try {
      const contract = await this.getViewContract(params.contractAddress);
      let res;
      if (!params.args) {
        res = await contract![params.methodName].call();
      } else {
        res = await contract![params.methodName].call(params.args);
      }
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
