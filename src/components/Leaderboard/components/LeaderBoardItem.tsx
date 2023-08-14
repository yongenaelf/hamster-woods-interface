import { LeaderBoardRankItem } from './LeaderBoardRankItem';
import { LeaderBoardNormalItem } from './LeaderBoardNormalItem';

enum Rank {
  First = 1,
  Second = 2,
  Third = 3,
}

export const LeaderBoardItem = ({ rank, address, beans }: { rank: number; address: string; beans: number }) => {
  switch (rank) {
    case Rank.First:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/gold.png').default.src}
          bgClassName="bg-[#F5BF49]"
          textClassName="text-stroke-[#DE7B3D]"
          shadowInsetColor="#DE7B3D"
          address={address}
          beans={beans}
        />
      );
    case Rank.Second:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/silver.png').default.src}
          bgClassName="bg-[#CEDFF7]"
          textClassName="text-stroke-[#6976CD]"
          shadowInsetColor="#B8B8EB"
          address={address}
          beans={beans}
        />
      );
    case Rank.Third:
      return (
        <LeaderBoardRankItem
          src={require('assets/images/bronze.png').default.src}
          bgClassName="bg-[#E97D3C]"
          textClassName="text-stroke-[#B5412C]"
          shadowInsetColor="#B5412C"
          address={address}
          beans={beans}
        />
      );
    default:
      return <LeaderBoardNormalItem rank={rank} address={address} beans={beans} />;
  }
};
