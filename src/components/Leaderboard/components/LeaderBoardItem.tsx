import { LeaderBoardRankItem } from './LeaderBoardRankItem';
import { LeaderBoardNormalItem } from './LeaderBoardNormalItem';
import { LeaderboardTextColors } from './LeaderBoardItemText';

enum Rank {
  First = 1,
  Second = 2,
  Third = 3,
}

export const LeaderBoardItem = ({
  rank,
  address,
  beans,
  isCurrentUserRank,
}: {
  rank: number;
  address: string;
  beans: number;
  isCurrentUserRank?: boolean;
}) => {
  switch (rank) {
    case Rank.First:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/gold.png').default.src}
          bgClassName="bg-[#F5BF49]"
          textClassName={LeaderboardTextColors.Gold}
          shadowInsetColor="#DE7B3D"
          address={address}
          beans={beans}
          isCurrentUserRank={isCurrentUserRank}
        />
      );
    case Rank.Second:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/silver.png').default.src}
          bgClassName="bg-[#CEDFF7]"
          textClassName={LeaderboardTextColors.Silver}
          shadowInsetColor="#B8B8EB"
          address={address}
          beans={beans}
          isCurrentUserRank={isCurrentUserRank}
        />
      );
    case Rank.Third:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/bronze.png').default.src}
          bgClassName="bg-[#E97D3C]"
          textClassName={LeaderboardTextColors.Bronze}
          shadowInsetColor="#B5412C"
          address={address}
          beans={beans}
          isCurrentUserRank={isCurrentUserRank}
        />
      );
    default:
      return (
        <LeaderBoardNormalItem rank={rank} address={address} beans={beans} isCurrentUserRank={isCurrentUserRank} />
      );
  }
};
