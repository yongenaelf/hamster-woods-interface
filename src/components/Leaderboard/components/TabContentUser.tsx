import { useIsMobile } from 'redux/selector/mobile';
import Image from 'next/image';

import { useConditionalRank } from '../hooks/useConditionalRank';
import { Neat } from './Neat';
import { LeaderBoardItemAddress } from './LeaderBoardItemAddress';
import { LeaderBoardItemScore } from './LeaderBoardItemScore';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import { Rank } from './Rank';
import useGetState from 'redux/state/useGetState';
import { DEFAULT_SYMBOL, Avatar } from 'constants/role';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { useWeeklyRank } from '../data/useWeeklyRank';
import MeIcon from 'assets/images/me.png';

export interface ITabContentUserProps {
  className?: string;
}

export const TabContentUser = ({ className }: ITabContentUserProps) => {
  const isMobile = useIsMobile();
  const { data } = useWeeklyRank();
  const { curBeanPass } = useGetState();
  const color: LeaderboardTextColors = LeaderboardTextColors.White;
  const wrapperClassName = useConditionalRank({
    rank: data?.selfRank.rank,
    first: 'bg-[#F5BF49]',
    second: 'bg-[#CEDFF7]',
    third: 'bg-[#E47B3D]',
    ranked: 'bg-gradient-to-b from-[#FFD304] to-[#FFF4C1]',
    unranked: 'bg-blue-700',
    missing: 'bg-[#D7D7D7]',
  });

  return (
    <div
      className={`${wrapperClassName} ${
        isMobile ? 'h-16 p-2 border-x-[8px] rounded-b-[20px]' : 'h-20 pl-2 border-x-[16px] rounded-b-[32px]'
      } flex items-center bg-[#9A531F] border-[#9A531F] ${className}`}>
      <img
        className={`${isMobile ? 'w-8' : 'w-16'}`}
        src={Avatar[curBeanPass?.symbol || DEFAULT_SYMBOL]}
        alt="avatar"
      />
      <Rank rank={data?.selfRank.rank} />
      <LeaderBoardItemAddress address={data?.selfRank.caAddress} color={color} />
      {data && data.selfRank.rank >= MAX_LEADERBOARD_ITEMS ? (
        <Image className="ml-2 w-16" src={MeIcon} alt="me" />
      ) : null}
      <div className="flex-grow mr-2"></div>
      <LeaderBoardItemScore score={data?.selfRank.score} color={color} />
      <Neat />
    </div>
  );
};
