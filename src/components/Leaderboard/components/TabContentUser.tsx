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
import { useCallback, useMemo, useState } from 'react';
import { useClaim } from '../data/useClaim';
import showMessage from 'utils/setGlobalComponentsInfo';
import useInitLeaderBoard from '../hooks/useInitLeaderBoard';
import { divDecimalsStr } from 'utils/calculate';
import ShowNFTModal from 'components/CommonModal/ShowNFTModal';
import { ShowBeanPassType } from 'components/CommonModal/type';
import { IClaimableInfoResult } from '../data/types';

export interface ITabContentUserProps {
  className?: string;
}

export const TabContentUser = ({ className }: ITabContentUserProps) => {
  const isMobile = useIsMobile();
  const { data } = useWeeklyRank();
  const { curBeanPass } = useGetState();
  const claimAward = useClaim();
  const { initialize } = useInitLeaderBoard();
  const [isShowNFT, setIsShowNFT] = useState(false);
  const [claimInfo, setClaimInfo] = useState<IClaimableInfoResult>();
  const [finishedClaim, setFinishedClaim] = useState(false);

  const showClaimBtn = useMemo(
    () => !!data?.settleDaySelfRank?.rewardNftInfo,
    [data?.settleDaySelfRank?.rewardNftInfo],
  );

  const refreshData = useCallback(async () => {
    try {
      await initialize();
      setFinishedClaim(false);
    } catch (error) {
      console.log('err', error);
    }
  }, [initialize]);

  const onClaim = useCallback(async () => {
    showMessage.loading();
    try {
      const result = await claimAward();
      setFinishedClaim(true);
      setClaimInfo(result);
      setIsShowNFT(true);
      refreshData();
    } catch (error) {
      console.log('err', error);
      showMessage.error('claim failed');
    } finally {
      showMessage.hideLoading();
    }
  }, [claimAward, refreshData]);

  return (
    <div
      className={`${
        isMobile ? 'p-2' : 'px-[32px] py-[12px]'
      } flex items-center bg-[#9A531F] rounded-b-[8px] ${className}`}>
      <ShowNFTModal
        open={isShowNFT}
        beanPassItem={claimInfo?.kingHamsterInfo}
        onCancel={() => setIsShowNFT(false)}
        type={ShowBeanPassType.Success}
      />
      <img
        className={`${isMobile ? 'w-8' : 'w-16'}`}
        src={Avatar[curBeanPass?.symbol || DEFAULT_SYMBOL]}
        alt="avatar"
      />
      <Rank rank={data?.selfRank.rank || data?.settleDaySelfRank?.rank} />
      <div className={`${isMobile ? 'text-[12px]' : 'text-[20px]'} ${LeaderboardTextColors.White} font-fonarto`}>
        {middleEllipsis(data?.selfRank.caAddress || data?.settleDaySelfRank?.caAddress)}
      </div>
      {data && Number(data?.selfRank?.rank) >= MAX_LEADERBOARD_ITEMS ? (
        <Image className="ml-2 w-16" src={MeIcon} alt="me" />
      ) : null}
      <div className="flex-grow mr-2"></div>
      <div className={`${isMobile ? 'text-[16px]' : 'text-[20px]'} font-fonarto text-white`}>
        {divDecimalsStr(
          data?.selfRank?.score || data?.settleDaySelfRank?.score,
          data?.selfRank?.decimals || data?.settleDaySelfRank?.decimals,
        ) ?? '-'}
      </div>
      <img
        className={`${isMobile ? 'mx-2 h-6' : 'mx-8 h-8'}`}
        src={require('assets/images/neat.png').default.src}
        alt="bean"
      />
      {showClaimBtn && !finishedClaim && (
        <div onClick={onClaim}>
          <div className="flex-grow mr-2"></div>
          <div className="bg-[#F78822] py-[6px] px-[12px] rounded-[8px] text-white text-[16px] flex items-center space-x-2">
            <span className="font-bold">Claim NFT Prizes</span>
            <img
              src={data?.settleDaySelfRank?.rewardNftInfo?.imageUrl}
              className={`z-10 w-[24px] h-[24px]`}
              width={24}
              height={24}
              alt="avatar"
            />
            <span className="font-black">{`*${data?.settleDaySelfRank?.rewardNftInfo?.balance}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};
