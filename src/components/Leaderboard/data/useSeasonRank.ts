import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { graphQLRequest } from 'api/graphql';

export const useSeasonRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getSeasonRank'], async () => {
    const { getSeasonRank } = await graphQLRequest<{
      getSeasonRank: IRankResult;
    }>(`
    query {
      getSeasonRank(getRankDto: { caAddress: "${address}" }) {
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
