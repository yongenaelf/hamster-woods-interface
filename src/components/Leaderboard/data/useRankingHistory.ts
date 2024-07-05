import useSWR from 'swr';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';
import { getPastRecord } from 'api/request';

export const useRankingHistory = () => {
  const address = useAddressWithPrefixSuffix();

  return useSWR(
    ['getPastRecord', address],
    async () => {
      if (!address) return;
      const pastRankList = await getPastRecord({
        CaAddress: `${address}`,
        SkipCount: 0,
        MaxResultCount: 200,
      });

      return pastRankList;
    },
    {
      dedupingInterval: 0,
    },
  );
};
