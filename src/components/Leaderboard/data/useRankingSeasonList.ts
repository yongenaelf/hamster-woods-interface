import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';
import { IRankingSeasonListResult } from './types';

export const useRankingSeasonList = () => {
  return useSWR<IRankingSeasonListResult | undefined>('getRankingSeasonList', async () => {
    const { getRankingSeasonList } =
      (await graphQLRequest<{
        getRankingSeasonList: IRankingSeasonListResult;
      }>(`
    query {
      getRankingSeasonList {
        season {
          id
          name
          rankBeginTime
          rankEndTime
          showBeginTime
          showEndTime
        }
      }
    }
  `)) || {};

    return getRankingSeasonList;
  });
};
