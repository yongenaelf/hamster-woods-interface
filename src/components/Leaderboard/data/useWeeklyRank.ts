import useSWR from 'swr';
import { IWeeklyRankResult } from './types';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { addPrefixSuffix } from 'utils/addressFormatting';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useWeeklyRank = () => {
  const address = useAddressWithPrefixSuffix();
  return useSWR<IWeeklyRankResult | undefined>([address, 'getWeekRank'], async () => {
    const { getWeekRank } =
      (await graphQLRequest<{
        getWeekRank: IWeeklyRankResult;
      }>(`
    query {
      getWeekRank(getRankDto: { 
        caAddress: "${address}"
        skipCount: 0
        maxResultCount: ${MAX_LEADERBOARD_ITEMS}
      }) {
        status
        refreshTime
        rankingList {
          rank
          score
          caAddress
        }
        selfRank {
          rank
          score
          caAddress
        }
      }
    }
  `)) || {};

    if (getWeekRank) {
      const { rankingList } = getWeekRank;

      return {
        ...getWeekRank,
        rankingList: rankingList.map((i) => ({ ...i, caAddress: addPrefixSuffix(i.caAddress) })),
        selfRank: {
          ...getWeekRank.selfRank,
          caAddress: addPrefixSuffix(getWeekRank.selfRank.caAddress),
        },
      };
    } else return undefined;
  });
};
