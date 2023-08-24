import { Bean } from './Bean';
import { LeaderBoardItemAddress } from './LeaderBoardItemAddress';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import { LeaderBoardItemScore } from './LeaderBoardItemScore';
import { useIsMobile } from 'redux/selector/mobile';
import { Me } from './Me';

export const LeaderBoardRankItem = ({
  src,
  bgClassName,
  textClassName,
  shadowInsetColor,
  address = '-',
  beans = 0,
  isCurrentUserRank,
}: {
  src: string;
  bgClassName: string;
  textClassName: LeaderboardTextColors;
  shadowInsetColor: string;
  address: string;
  beans: number;
  isCurrentUserRank?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative mb-2 flex w-full items-center rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute before:bg-white before:bg-opacity-30 ${
        isMobile
          ? 'h-12 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-24 before:h-10 before:left-2 before:right-2 before:top-2 before:rounded-2xl'
      } ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <img className="h-full" src={src} alt="rank" />
      <LeaderBoardItemAddress address={address} color={textClassName} />
      {isCurrentUserRank ? <Me /> : null}
      <span className="flex-grow"></span>
      <LeaderBoardItemScore score={beans} color={textClassName} />
      <Bean />
    </div>
  );
};
