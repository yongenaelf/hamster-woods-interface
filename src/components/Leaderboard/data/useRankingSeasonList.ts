import useSWR from 'swr';

interface IRankingSeasonItem {
  id: string;
  beginTime: string;
  endTime: string;
}

interface IRankingSeasonListResult {
  Season: IRankingSeasonItem[];
}

export const useRankingSeasonList = () => {
  return useSWR<IRankingSeasonListResult>('getRankingSeasonList', async () => {
    // handle logic to fetch here.
    const mockFetcher = async () => {
      return {
        Season: Array(10)
          .fill(0)
          .map((_, idx) => ({
            id: `Season ${idx + 1}`,
            beginTime: new Date(2023, idx, 1).toISOString().slice(0, 10).replaceAll('-', '.'),
            endTime: new Date(2023, idx + 1, 1).toISOString().slice(0, 10).replaceAll('-', '.'),
          })),
      };
    };

    return await mockFetcher();
  });
};
