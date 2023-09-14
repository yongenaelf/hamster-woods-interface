import AElf from 'aelf-sdk';
import { sleep } from './common';

export function getAElf(rpcUrl?: string) {
  const rpc = rpcUrl || '';
  const httpProviders: any = {};

  if (!httpProviders[rpc]) {
    httpProviders[rpc] = new AElf(new AElf.providers.HttpProvider(rpc));
  }
  return httpProviders[rpc];
}

export async function getTxResult(
  TransactionId: string,
  chainId: Chain,
  reGetCount = 0,
  rpcUrl: string,
  reNotexistedCount = 3,
): Promise<any> {
  const txResult = await getAElf(rpcUrl).chain.getTxResult(TransactionId);
  if (txResult.error && txResult.errorMessage) {
    throw Error(txResult.errorMessage.message || txResult.errorMessage.Message);
  }

  if (!txResult) {
    throw Error('Can not get transaction result.');
  }

  if (txResult.Status.toLowerCase() === 'pending') {
    reGetCount++;
    await sleep(500);
    return getTxResult(TransactionId, chainId, reGetCount, rpcUrl, reNotexistedCount);
  }

  if (txResult.Status.toLowerCase() === 'notexisted' && reNotexistedCount) {
    await sleep(500);
    reNotexistedCount--;
    return getTxResult(TransactionId, chainId, reGetCount, rpcUrl, reNotexistedCount);
  }

  if (txResult.Status.toLowerCase() === 'mined') {
    return { TransactionId, txResult };
  }

  throw Error({ ...txResult.Error, TransactionId } || 'Transaction error');
}

export async function getTxResultOnce(TransactionId: string, rpcUrl: string): Promise<any> {
  const txResult = await getAElf(rpcUrl).chain.getTxResult(TransactionId);
  if (txResult.error && txResult.errorMessage) {
    throw Error(txResult.errorMessage.message || txResult.errorMessage.Message);
  }

  if (!txResult) {
    throw Error('Can not get transaction result.');
  }

  if (txResult.Status.toLowerCase() === 'pending') {
    return {
      status: 'pending',
      TransactionId,
      txResult,
    };
  }

  if (txResult.Status.toLowerCase() === 'notexisted') {
    return {
      status: 'notexisted',
      TransactionId,
      txResult,
    };
  }

  if (txResult.Status.toLowerCase() === 'mined') {
    return { TransactionId, txResult };
  }

  throw Error({ ...txResult.Error, TransactionId } || 'Transaction error');
}
