import { ChainId } from '@portkey/types';
import { DIDWalletInfo, did } from '@portkey/did-ui-react';

export default async function getAccountInfoSync(chainId: string, didWalletInfo?: DIDWalletInfo) {
  const currentChainId = chainId as ChainId;
  const holder = await did.didWallet.getHolderInfoByContract({
    chainId: currentChainId,
    caHash: didWalletInfo?.caInfo?.caHash,
  });
  const filteredHolders = holder.managerInfos.filter(
    (manager) => manager?.address === didWalletInfo?.walletInfo?.address,
  );
  console.log({ holder, filteredHolders });

  return { holder, filteredHolders };
}
