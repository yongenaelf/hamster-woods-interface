import useSWR from 'swr';
import { IWeeklyRankResult } from './types';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { useAddress } from 'hooks/useAddress';

export const useWeeklyRank = () => {
  const address = useAddress();
  return useSWR<IWeeklyRankResult>([address, 'getWeekRank'], async () => {
    const { getWeekRank } = await graphQLRequest<{
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
  `);

    return getWeekRank;
  });
};
