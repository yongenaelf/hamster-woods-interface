import { useIsMobile } from 'redux/selector/mobile';

export enum LeaderboardTextColors {
  Gold = 'text-white text-stroke-[#DE7B3D]',
  Silver = 'text-white text-stroke-[#6976CD]',
  Bronze = 'text-white text-stroke-[#B5412C]',
  Blue = 'text-[#0538C9]',
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
