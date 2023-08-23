import { middleEllipsis } from 'utils/middleEllipsis';
import { ILeaderBoardItemText, LeaderBoardItemText } from './LeaderBoardItemText';

interface ILeaderBoardItemAddress extends ILeaderBoardItemText {
  address?: string;
}
export const LeaderBoardItemAddress = ({ address, color }: ILeaderBoardItemAddress) => {
  return <LeaderBoardItemText color={color}>{middleEllipsis(address)}</LeaderBoardItemText>;
};
