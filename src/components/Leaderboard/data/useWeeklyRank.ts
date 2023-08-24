import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';

export const useWeeklyRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getWeekRank'], async () => {
    const { getWeekRank } = await graphQLRequest<{
      getWeekRank: IRankResult;
    }>(`
    query {
      getWeekRank(getRankDto: { 
        caAddress: "${address}"
        skipCount: 0
        maxResultCount: ${MAX_LEADERBOARD_ITEMS}
      }) {
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
