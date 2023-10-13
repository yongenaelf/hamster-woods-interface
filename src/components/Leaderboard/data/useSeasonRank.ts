import useSWR from 'swr';
import { ISeasonRankResult } from './types';
import { graphQLRequest } from 'api/graphql';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { addPrefixSuffix } from 'utils/addressFormatting';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useSeasonRank = () => {
  const address = useAddressWithPrefixSuffix();
  return useSWR([address, 'getSeasonRank'], async () => {
    const { getSeasonRank } =
      (await graphQLRequest<{
        getSeasonRank: ISeasonRankResult;
      }>(`
    query {
      getSeasonRank(getRankDto: { 
        caAddress: "${address}"
        skipCount: 0
        maxResultCount: ${MAX_LEADERBOARD_ITEMS}
      }) {
        status
        refreshTime
        seasonName
        rankingList {
          rank
          score
          caAddress
        }
        selfRank {
          rank
          score
          caAddress
        }
      }
    }
  `)) || {};

    if (getSeasonRank) {
      const { rankingList } = getSeasonRank;

      return {
        ...getSeasonRank,
        rankingList: rankingList?.map((i) => ({ ...i, caAddress: addPrefixSuffix(i.caAddress) })) ?? [],
        selfRank: {
          ...getSeasonRank.selfRank,
          caAddress: addPrefixSuffix(getSeasonRank.selfRank.caAddress),
        },
      };
    } else return undefined;
  });
};
