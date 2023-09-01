import { getAElf } from './getTxResult';

export async function getBlockHeight(
  chainId: Chain,
  reGetCount = 0,
  rpcUrl: string,
  expectedBlockHeight: number,
): Promise<any> {
  const blockResult = await getAElf(rpcUrl).chain.getBlockHeight();
  if (blockResult.error && blockResult.errorMessage) {
    throw Error(blockResult.errorMessage.message || blockResult.errorMessage.Message);
  }

  if (!blockResult) {
    throw Error('Can not get result.');
  }

  if (blockResult < expectedBlockHeight) {
    reGetCount++;
    return getBlockHeight(chainId, reGetCount, rpcUrl, expectedBlockHeight);
  }

  if (blockResult >= expectedBlockHeight) {
    return true;
  }

  throw Error({ ...blockResult.Error } || 'error');
}
