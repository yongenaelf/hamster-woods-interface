import { useConditionalRank } from '../hooks/useConditionalRank';
import { Bean } from './Bean';
import { LeaderBoardItemAddress } from './LeaderBoardItemAddress';
import { LeaderBoardItemScore } from './LeaderBoardItemScore';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import { Rank } from './Rank';

interface ITabContentUser {
  showMeIcon?: boolean;
  rank?: number;
  address?: string;
  score?: number;
}
export const TabContentUser = ({ showMeIcon, rank, address, score }: ITabContentUser) => {
  const color: LeaderboardTextColors = LeaderboardTextColors.White;

  const wrapperClassName = useConditionalRank({
    rank,
    first: 'bg-[#F5BF49]',
    second: 'bg-[#CEDFF7]',
    third: 'bg-[#E47B3D]',
    ranked: 'bg-gradient-to-b from-[#FFD304] to-[#FFF4C1]',
    unranked: 'bg-blue-700',
    missing: 'bg-[#D7D7D7]',
  });

  return (
    <div className={`${wrapperClassName} flex h-24 items-center rounded-bl-2xl rounded-br-2xl pb-4 pl-3 pr-4 pt-4`}>
      <span className="ml-2"></span>
      <Rank rank={rank} />
      <LeaderBoardItemAddress address={address} color={color} />
      {showMeIcon ? <img className="ml-2 w-16" src={require('assets/images/me.png').default.src} alt="me" /> : null}
      <div className="flex-grow"></div>
      <LeaderBoardItemScore score={score} color={color} />
      <Bean />
      <span className="mr-2"></span>
    </div>
  );
};
