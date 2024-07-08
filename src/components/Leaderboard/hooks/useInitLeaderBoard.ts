import { getPastRecord, getWeekRank } from 'api/request';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';
import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { addPrefixSuffix } from 'utils/addressFormatting';

export default function useInitLeaderBoard() {
  const { mutate } = useSWRConfig();
  const address = useAddressWithPrefixSuffix();

  const initWeekRankData = useCallback(
    async (address: string) => {
      let data;
      const weekRank = await getWeekRank({
        CaAddress: `${address}`,
        SkipCount: 0,
        MaxResultCount: `${MAX_LEADERBOARD_ITEMS}`,
      });

      if (weekRank) {
        const { rankingList } = weekRank;

        data = {
          ...weekRank,
          rankingList: rankingList?.map((i) => ({ ...i, caAddress: addPrefixSuffix(i?.caAddress || '') })) ?? [],
          selfRank: {
            ...weekRank.selfRank,
            caAddress: addPrefixSuffix(weekRank?.selfRank?.caAddress || ''),
          },
        };
      } else {
        data = undefined;
      }
      mutate(['getWeekRank', address], data);
    },
    [mutate],
  );

  const initPastRankData = useCallback(
    async (address: string) => {
      const pastDataList = await getPastRecord({
        CaAddress: `${address}`,
        SkipCount: 0,
        MaxResultCount: '200',
      });

      const data = pastDataList ? pastDataList : [];

      mutate(['getPastRecord', address], data);
    },
    [mutate],
  );

  const initialize = useCallback(async () => {
    if (!address) return;
    return await Promise.all([initWeekRankData(address), initPastRankData(address)]);
  }, [address, initPastRankData, initWeekRankData]);

  return {
    initialize,
    initWeekRankData,
    initPastRankData,
  };
}
