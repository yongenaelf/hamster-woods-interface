import { useIsMobile } from 'redux/selector/mobile';
import Image from 'next/image';

import { useConditionalRank } from '../hooks/useConditionalRank';
import { Rank } from './Rank';
import useGetState from 'redux/state/useGetState';
import { DEFAULT_SYMBOL, Avatar } from 'constants/role';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { useWeeklyRank } from '../data/useWeeklyRank';
import MeIcon from 'assets/images/me.png';
import { middleEllipsis } from 'utils/middleEllipsis';
import { LeaderboardTextColors } from '../data/constant';

export interface ITabContentUserProps {
  className?: string;
}

const showClaimBtn = true;

export const TabContentUser = ({ className }: ITabContentUserProps) => {
  const isMobile = useIsMobile();
  const { data } = useWeeklyRank();
  const { curBeanPass } = useGetState();

  return (
    <div className={`${isMobile ? 'p-2' : 'px-[32px] py-[12px]'} flex items-center bg-[#9A531F] ${className}`}>
      <img
        className={`${isMobile ? 'w-8' : 'w-16'}`}
        src={Avatar[curBeanPass?.symbol || DEFAULT_SYMBOL]}
        alt="avatar"
      />
      <Rank rank={data?.selfRank.rank} />
      <div className={`${isMobile ? 'text-[12px]' : 'text-[20px]'} ${LeaderboardTextColors.White} font-fonarto`}>
        {middleEllipsis(data?.selfRank.caAddress)}
      </div>
      {data && data.selfRank.rank >= MAX_LEADERBOARD_ITEMS ? (
        <Image className="ml-2 w-16" src={MeIcon} alt="me" />
      ) : null}
      <div className="flex-grow mr-2"></div>
      <div className={`${isMobile ? 'text-[16px]' : 'text-[20px]'} font-fonarto text-white`}>
        {data?.selfRank.score?.toLocaleString() ?? '-'}
      </div>
      <img
        className={`${isMobile ? 'mx-2 h-6' : 'mx-8 h-8'}`}
        src={require('assets/images/neat.png').default.src}
        alt="bean"
      />
      {showClaimBtn && (
        <>
          <div className="flex-grow mr-2"></div>
          <div className="bg-[#F78822] py-[6px] px-[12px] rounded-[8px] text-white text-[16px] flex items-center space-x-2">
            <span className="font-bold">Claim NFT Rewards</span>
            <img
              src={require('assets/images/prize-5.png').default.src}
              className={`z-10 w-[24px] h-[24px]`}
              width={24}
              height={24}
              alt="avatar"
            />
            <span className="font-black">*2</span>
          </div>
        </>
      )}
    </div>
  );
};
