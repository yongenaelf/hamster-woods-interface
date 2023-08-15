import { ILeaderBoardItemText, LeaderBoardItemText } from './LeaderBoardItemText';

interface ILeaderBoardItemScore extends ILeaderBoardItemText {
  score?: number;
}
export const LeaderBoardItemScore = ({ score, color }: ILeaderBoardItemScore) => {
  return <LeaderBoardItemText color={color}>{score?.toLocaleString() ?? '-'}</LeaderBoardItemText>;
};
