import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';
import { IRankItem } from './rankResult';

interface IRankingSeasonHistoryResult {
  season: IRankItem;
  weeks: IRankItem[];
}

export const useRankingSeasonHis = (seasonId: string, address: string) => {
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
