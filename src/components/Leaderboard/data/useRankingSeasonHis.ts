import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';
import { IRankingSeasonHistoryResult } from './types';
import { useAddress } from 'hooks/useAddress';

export const useRankingSeasonHis = (seasonId: string) => {
  const address = useAddress();
  return useSWR<IRankingSeasonHistoryResult>([seasonId, address, 'getRankingSeasonHis'], async () => {
    const { getRankingHis } = await graphQLRequest<{
      getRankingHis: IRankingSeasonHistoryResult;
    }>(`
    query {
      getRankingHis(
        getRankingHisDto: {
          seasonId: "${seasonId}"
          caAddress: "${address}"
        }
      ) {
        season {
          rank
          score
          caAddress
        }
        weeks {
          rank
          score
          caAddress
        }
      }
    }
  `);

    return getRankingHis;
  });
};
