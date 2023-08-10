import useSWR from 'swr';

interface IRankingResult {
  score: number;
  rank: number;
}

interface IRankingSeasonHistoryResult {
  season: IRankingResult;
  weeks: IRankingResult[];
}

export const useRankingSeasonHis = (seasonId: string, address: string) => {
  return useSWR<IRankingSeasonHistoryResult>([seasonId, address, 'getRankingSeasonHis'], async () => {
    // handle logic to fetch here.
    const mockFetcher = async () => {
      return {
        season: {
          score: 261,
          rank: 0,
        },
        weeks: [
          {
            score: 1,
            rank: 1,
          },
          {
            score: 2,
            rank: 2,
          },
          {
            score: 0,
            rank: 0,
          },
          {
            score: 0,
            rank: 0,
          },
        ],
      };
    };

    return await mockFetcher();
  });
};
