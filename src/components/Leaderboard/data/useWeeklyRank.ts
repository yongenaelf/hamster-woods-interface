import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { graphQLRequest } from 'api/graphql';

export const useWeeklyRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getWeekRank'], async () => {
    const { getWeekRank } = await graphQLRequest<{
      getWeekRank: IRankResult;
    }>(`
    query {
      getWeekRank(getRankDto: { 
        caAddress: "${address}"
        skipCount: 0
        maxResultCount: 100
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
