import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';

export const useSeasonRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getSeasonRank'], async () => {
    const { getSeasonRank } = await graphQLRequest<{
      getSeasonRank: IRankResult;
    }>(`
    query {
      getSeasonRank(getRankDto: { 
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

    return getSeasonRank;
  });
};
