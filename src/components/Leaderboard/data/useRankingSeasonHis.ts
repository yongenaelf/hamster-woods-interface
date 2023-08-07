import useSWR from "swr";

interface IRankingResult {
  Score: number;
  rank: number;
}

interface IRankingSeasonHistoryResult {
  season: IRankingResult;
  weeks: IRankingResult[];
}

export const useRankingSeasonHis = (seasonId: string, address: string) => {
  return useSWR<IRankingSeasonHistoryResult>(
    [seasonId, address, "getRankingSeasonHis"],
    async () => {
      // handle logic to fetch here.
      const mockFetcher = async () => {
        return {
          season: {
            Score: 261,
            rank: 0,
          },
          weeks: [
            {
              Score: 1,
              rank: 1,
            },
            {
              Score: 2,
              rank: 2,
            },
            {
              Score: 0,
              rank: 0,
            },
            {
              Score: 0,
              rank: 0,
            },
          ],
        };
      };

      return await mockFetcher();
    }
  );
};
