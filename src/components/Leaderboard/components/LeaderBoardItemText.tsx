import { useIsMobile } from 'redux/selector/mobile';

export enum LeaderboardTextColors {
  Gold = 'text-white text-stroke-leaderboard-gold',
  Silver = 'text-white text-stroke-leaderboard-silver',
  Bronze = 'text-white text-stroke-leaderboard-bronze',
  Blue = 'text-leaderboard-blue',
  White = 'text-white',
}

export interface ILeaderBoardItemText extends React.PropsWithChildren {
  color?: LeaderboardTextColors;
}

export const LeaderBoardItemText = ({ children, color = LeaderboardTextColors.White }: ILeaderBoardItemText) => {
  const isMobile = useIsMobile();

  const isRankedColor = [
    LeaderboardTextColors.Gold,
    LeaderboardTextColors.Silver,
    LeaderboardTextColors.Bronze,
  ].includes(color);

  const fontFamily = isRankedColor ? 'font-paytone' : 'font-roboto';
  const textSize = isRankedColor ? (isMobile ? 'text-2xl' : 'text-3xl') : isMobile ? 'text-xl' : 'text-2xl';

  return <div className={`font-bold ${fontFamily} ${color} ${textSize}`}>{children}</div>;
};
