import useSWR from 'swr';
import { ISeasonRankResult } from './types';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { useAddress } from 'hooks/useAddress';

export const useSeasonRank = () => {
  const address = useAddress();
  return useSWR<ISeasonRankResult>([address, 'getSeasonRank'], async () => {
    const { getSeasonRank } = await graphQLRequest<{
      getSeasonRank: ISeasonRankResult;
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
