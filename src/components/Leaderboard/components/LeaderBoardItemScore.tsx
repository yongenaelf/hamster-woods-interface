import useGetState from 'redux/state/useGetState';
import { ILeaderBoardItemText, LeaderBoardItemText } from './LeaderBoardItemText';

interface ILeaderBoardItemScore extends ILeaderBoardItemText {
  score?: number;
}
export const LeaderBoardItemScore = ({ score, color }: ILeaderBoardItemScore) => {
  const { isMobile } = useGetState();
  return (
    <LeaderBoardItemText className={`${isMobile ? '!text-[16px]' : ''}`} color={color}>
      {score?.toLocaleString() ?? '-'}
    </LeaderBoardItemText>
  );
};
