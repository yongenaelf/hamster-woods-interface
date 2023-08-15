import useSWR from 'swr';
import { IRankResult } from './rankResult';
import { getRandomAddress } from 'utils/getRandomAddress';

export const useSeasonRank = (address: string) => {
  return useSWR<IRankResult>([address, 'getSeasonRank'], async () => {
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
          rank: 100,
        },
      };
    };

    return await mockFetcher();
  });
};
