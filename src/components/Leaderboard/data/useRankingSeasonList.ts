import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';

interface IRankingSeasonItem {
  id: string;
  name: string;
  rankBeginTime: string;
  rankEndTime: string;
  showBeginTime: string;
  showEndTime: string;
}

interface IRankingSeasonListResult {
  season: IRankingSeasonItem[];
}

export const useRankingSeasonList = () => {
  return useSWR<IRankingSeasonListResult>('getRankingSeasonList', async () => {
    const { getRankingSeasonList } = await graphQLRequest<{
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
  `);

    return getRankingSeasonList;
  });
};
