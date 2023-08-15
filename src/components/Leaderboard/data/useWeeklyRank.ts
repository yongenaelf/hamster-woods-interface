import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { getRandomAddress } from 'utils/getRandomAddress';

export const useWeeklyRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getWeekRank'], async () => {
    // handle logic to fetch here.
    const mockFetcher = async () => {
      return {
        rankingList: Array(99)
          .fill(0)
          .map((_, idx) => ({
            caAddress: getRandomAddress(),
            score: 20,
            rank: idx + 1,
          })),
        selfRank: {
          caAddress: getRandomAddress(),
          score: 20,
          rank: 5,
        },
      };
    };

    return await mockFetcher();
  });
};
