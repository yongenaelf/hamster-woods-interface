import useSWR from 'swr';
import { MAX_LOCK_INFO_ITEMS, MAX_UNLOCK_INFO_ITEMS } from 'constants/platform';
import { getLockInfos, getUnlockRecords } from 'api/request';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useLockInfos = () => {
  const address = useAddressWithPrefixSuffix();

  return useSWR(
    ['getLockInfos', address],
    async () => {
      if (!address) return;
      const lockInfo = await getLockInfos({
        CaAddress: `${address}`,
        SkipCount: 0,
        MaxResultCount: `${MAX_LOCK_INFO_ITEMS}`,
      });

      return lockInfo ? { ...lockInfo } : undefined;
    },
    {
      dedupingInterval: 0,
    },
  );
};

export const useUnlockRecords = () => {
  const address = useAddressWithPrefixSuffix();

  return useSWR(
    ['getUnlockRecords', address],
    async () => {
      if (!address) return;
      const unlockInfo = await getUnlockRecords({
        CaAddress: `${address}`,
        SkipCount: 0,
        MaxResultCount: `${MAX_UNLOCK_INFO_ITEMS}`,
      });
      return unlockInfo;
    },
    {
      dedupingInterval: 0,
    },
  );
};
