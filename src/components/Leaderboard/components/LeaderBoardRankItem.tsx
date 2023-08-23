import { Bean } from './Bean';
import { LeaderBoardItemAddress } from './LeaderBoardItemAddress';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import { LeaderBoardItemScore } from './LeaderBoardItemScore';

export const LeaderBoardRankItem = ({
  src,
  bgClassName,
  textClassName,
  shadowInsetColor,
  address = '-',
  beans = 0,
}: {
  src: string;
  bgClassName: string;
  textClassName: LeaderboardTextColors;
  shadowInsetColor: string;
  address: string;
  beans: number;
}) => {
  return (
    <div
      className={`relative mb-2 flex h-24 w-full items-center rounded-3xl border border-[#003658] p-1 shadow-inner before:absolute before:left-2 before:right-2 before:top-2 before:h-10 before:rounded-2xl before:bg-white before:bg-opacity-30 ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <img className="h-full" src={src} alt="rank" />
      <LeaderBoardItemAddress address={address} color={textClassName} />
      <span className="flex-grow"></span>
      <LeaderBoardItemScore score={beans} color={textClassName} />
      <Bean />
    </div>
  );
};
