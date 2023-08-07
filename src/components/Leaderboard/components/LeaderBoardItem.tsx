import { LeaderBoardRankItem } from "./LeaderBoardRankItem";
import { LeaderBoardNormalItem } from "./LeaderBoardNormalItem";

export const LeaderBoardItem = ({
  rank,
  address,
  beans,
}: {
  rank: number;
  address: string;
  beans: number;
}) => {
  switch (rank) {
    case 1:
      return (
        <LeaderBoardRankItem
          src={require("../images/gold.png").default.src}
          bgClassName="bg-[#F5BF49]"
          textClassName="text-stroke-[#DE7B3D]"
          shadowInsetColor="#DE7B3D"
          address={address}
          beans={beans}
        />
      );
    case 2:
      return (
        <LeaderBoardRankItem
          src={require("../images/silver.png").default.src}
          bgClassName="bg-[#CEDFF7]"
          textClassName="text-stroke-[#6976CD]"
          shadowInsetColor="#B8B8EB"
          address={address}
          beans={beans}
        />
      );
    case 3:
      return (
        <LeaderBoardRankItem
          src={require("../images/bronze.png").default.src}
          bgClassName="bg-[#E97D3C]"
          textClassName="text-stroke-[#B5412C]"
          shadowInsetColor="#B5412C"
          address={address}
          beans={beans}
        />
      );
    default:
      return (
        <LeaderBoardNormalItem rank={rank} address={address} beans={beans} />
      );
  }
};
