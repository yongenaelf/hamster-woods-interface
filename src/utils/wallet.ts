import { GetCAHolderByManagerParams } from '@portkey/services';
import { ChainId } from '@portkey/provider-types';
import { did } from '@portkey/did-ui-react';
import { LoginStatusEnum } from '@portkey/types';

export const getCaHashAndOriginChainIdByWallet = async (
  caAddress: string,
): Promise<{ caHash: string; originChainId: ChainId }> => {
  const res = await did.services.getHolderInfoByManager({
    caAddresses: [caAddress],
  } as unknown as GetCAHolderByManagerParams);
  const caInfo = res[0];
  const caHash = caInfo?.caHash;
  const originChainId = caInfo?.chainId as ChainId;

  return {
    caHash: caHash || '',
    originChainId,
  };
};

export const isLoginOnChain = () => {
  console.log('wfs isLoginStatus', did.didWallet.isLoginStatus);
  return did.didWallet.isLoginStatus === LoginStatusEnum.SUCCESS;
};
