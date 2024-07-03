import { claimAward } from 'api/request';
import { useCallback } from 'react';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useClaim = () => {
  const address = useAddressWithPrefixSuffix();

  return useCallback(() => {
    return claimAward({ caAddress: address });
  }, [address]);
};
