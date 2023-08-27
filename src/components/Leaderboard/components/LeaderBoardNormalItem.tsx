import { useIsMobile } from 'redux/selector/mobile';
import { Bean } from './Bean';
import { Rank } from './Rank';
import { LeaderBoardItemAddress } from './LeaderBoardItemAddress';
import { LeaderBoardItemScore } from './LeaderBoardItemScore';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import { Me } from './Me';

export const LeaderBoardNormalItem = ({
  rank = 4,
  address = '-',
  beans = 0,
  isCurrentUserRank,
}: {
  rank: number;
  address: string;
  beans: number;
  isCurrentUserRank?: boolean;
}) => {
  const isMobile = useIsMobile();
  const borderColor = isCurrentUserRank ? 'border-white' : 'border-[#003658]';
  const bgColor = isCurrentUserRank ? 'bg-gradient-to-b from-[#FFD304] to-[#FFF4C1]' : 'bg-[#81A2D7]';
  const shadow = isCurrentUserRank
    ? 'shadow-[0px_2px_4px_rgba(0,0,0,0.12)]'
    : 'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12),0px_-3px_0px_0px_#6D8EC3_inset] shadow-inner';
  const color = isCurrentUserRank ? LeaderboardTextColors.Blue : LeaderboardTextColors.White;

  return (
    <div
      className={`mb-2 flex w-full items-center rounded-3xl border p-1 ${borderColor} ${bgColor} ${shadow} ${
        isMobile ? 'h-12' : 'h-16'
      }`}>
      <Rank rank={rank} />
      <LeaderBoardItemAddress address={address} color={color} />
      {isCurrentUserRank ? <Me /> : null}
      <div className="flex-grow"></div>
      <LeaderBoardItemScore score={beans} color={color} />
      <Bean />
    </div>
  );
};
