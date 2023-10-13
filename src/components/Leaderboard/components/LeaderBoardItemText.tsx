import { useIsMobile } from 'redux/selector/mobile';

export enum LeaderboardTextColors {
  Gold = 'text-white',
  Silver = 'text-white',
  Bronze = 'text-white',
  Blue = 'text-leaderboard-blue',
  White = 'text-white',
}

export interface ILeaderBoardItemText extends React.PropsWithChildren {
  color?: LeaderboardTextColors;
  className?: string;
}

export const LeaderBoardItemText = ({
  children,
  color = LeaderboardTextColors.White,
  className,
}: ILeaderBoardItemText) => {
  const isMobile = useIsMobile();
  const isRankedColor = [
    LeaderboardTextColors.Gold,
    LeaderboardTextColors.Silver,
    LeaderboardTextColors.Bronze,
  ].includes(color);

  const fontFamily = isRankedColor ? 'font-fonarto' : '';
  const textSize = isRankedColor ? (isMobile ? 'text-[12px]' : 'text-xl') : isMobile ? 'text-[12px]' : 'text-sm';

  return <div className={`font-bold ${fontFamily} ${color} ${textSize} ${className}`}>{children}</div>;
};
