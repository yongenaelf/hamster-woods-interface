import { WalletType } from 'constants/index';
import { getContractBasic } from '@portkey/contracts';
import { ChainId, SendOptions } from '@portkey/types';
import { did } from '@portkey/did-ui-react';

import { CallContractParams } from 'types';
import { getAElfInstance, getViewWallet } from 'utils/contractInstance';
import { formatErrorMsg } from 'utils/formattError';
import { aelf, sleep } from '@portkey/utils';
import { getTxResult } from 'utils/getTxResult';
import DetectProvider from 'utils/InstanceProvider';

interface IContractConfig {
  chainId: ChainId;
  rpcUrl?: string;
}

export default class ContractRequest {
  private static instance: ContractRequest | null = null;
  private walletType: WalletType = WalletType.unknown;
  private chainId: ChainId | undefined;
  private rpcUrl: string | undefined;
  private wallet: any = {};

  static get() {
    if (!ContractRequest.instance) {
      ContractRequest.instance = new ContractRequest();
    }
    return ContractRequest.instance;
  }

  public setConfig(config: IContractConfig) {
    this.chainId = config.chainId;
    this.rpcUrl = config.rpcUrl;
  }

  public setWallet(wallet: any, walletType: WalletType) {
    if (wallet) {
      this.walletType = walletType;
      if (walletType === WalletType.discover) {
        this.wallet.discoverInfo = wallet.discoverInfo;
      } else {
        this.wallet.portkeyInfo = wallet.portkeyInfo;
      }
    }
  }

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
          const dp = await DetectProvider.getDetectProvider();
          const chainProvider = await dp?.getChain(this.chainId as ChainId);
          if (!chainProvider) return;
          const contract = await getContractBasic({
            contractAddress: params.contractAddress,
            chainProvider: chainProvider,
          });
          const accounts = discoverInfo.accounts;
          const accountsInChain = accounts[this.chainId as ChainId];
          if (!accountsInChain || accountsInChain.length === 0) {
            throw new Error(`Account not found in chain: ${this.chainId}`);
          }
          const address = accountsInChain[0];
          result = await contract.callSendMethod(params.methodName, address, params.args, sendOptions);
        } catch (error) {
          console.error('=====callSendMethod error', error);
          return Promise.reject(error);
        }
        break;
      }
      case WalletType.portkey: {
        try {
          const chainsInfo = await did.services.getChainsInfo();
          const chainInfo = chainsInfo.find((chain) => chain.chainId === this.chainId);
          if (!chainInfo) {
            throw new Error(`Chain is not running: ${this.chainId}`);
          }
          const didWalletInfo = this.wallet.portkeyInfo!;
          const account = aelf.getWallet(didWalletInfo.walletInfo.privateKey);
          const caContract = await getContractBasic({
            contractAddress: chainInfo.caContractAddress,
            account,
            rpcUrl: chainInfo.endPoint,
          });
          result = await caContract.callSendMethod(
            'ManagerForwardCall',
            didWalletInfo.walletInfo.address,
            {
              caHash: didWalletInfo.caInfo.caHash,
              contractAddress: params.contractAddress,
              methodName: params.methodName,
              args: params.args,
            },
            sendOptions,
          );
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    if (result?.error || result?.code || result?.Error) {
      return Promise.reject(formatErrorMsg(result));
    }

    const { transactionId, TransactionId } = result.result || result;
    const resTransactionId = TransactionId || transactionId;
    await sleep(1000);
    const transaction = await getTxResult(resTransactionId!, this.chainId as ChainId, 0, this.rpcUrl!);

    return Promise.resolve({
      TransactionId: transaction.TransactionId,
      TransactionResult: transaction.txResult,
    });
  }

  public async callViewMethod<T, R>(params: CallContractParams<T>): Promise<R> {
    const aelfInstance = getAElfInstance(this.rpcUrl!);
    const viewWallet = getViewWallet();

    const contract = await aelfInstance.chain.contractAt(params.contractAddress, viewWallet);
    let res;
    if (!params.args) {
      res = await contract[params.methodName].call();
    } else {
      res = await contract[params.methodName].call(params.args);
    }
    return res;
  }
}
