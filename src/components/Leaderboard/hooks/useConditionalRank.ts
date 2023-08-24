import { ReactNode } from 'react';

interface IUseConditionalRank {
  rank?: number | string;
  first: ReactNode;
  second: ReactNode;
  third: ReactNode;
  ranked: ReactNode;
  unranked: ReactNode;
  missing: ReactNode;
}
export const useConditionalRank = ({ rank, first, second, third, ranked, unranked, missing }: IUseConditionalRank) => {
  if (rank) {
    const numRank = Number(rank);
    if (numRank > 3 && numRank < 100) {
      // rank is 4 to 99
      return ranked;
    } else {
      switch (numRank) {
        // rank is undefined (-1)
        case -1:
          return missing;
        case 1:
          return first;
        case 2:
          return second;
        case 3:
          return third;
        // rank is 100 and above
        default:
          return unranked;
      }
    }
  } else {
    // rank is undefined (-1)
    return missing;
  }
};
