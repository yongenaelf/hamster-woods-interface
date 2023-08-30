import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';
import { IRankingSeasonHistoryResult } from './types';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useRankingSeasonHis = (seasonId: string) => {
  const address = useAddressWithPrefixSuffix();
  return useSWR<IRankingSeasonHistoryResult | undefined>([seasonId, address, 'getRankingSeasonHis'], async () => {
    const { getRankingHis } =
      (await graphQLRequest<{
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
          week
          rank
          score
          caAddress
        }
      }
    }
  `)) || {};

    return getRankingHis;
  });
};
