import useSWR from 'swr';
import { IRankResult } from './rankResult';

export const useWeeklyRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getWeekRank'], async () => {
    // handle logic to fetch here.
    const mockFetcher = async () => {
      return {
        rankingList: Array(99)
          .fill(0)
          .map((_, idx) => ({
            caAddress: 'ELF_2t8...81_AELF',
            score: 20,
            rank: idx + 1,
          })),
        selfRank: {
          caAddress: 'ELF_2t8...81_AELF',
          score: 20,
          rank: 1,
        },
      };
    };

    return await mockFetcher();
  });
};
