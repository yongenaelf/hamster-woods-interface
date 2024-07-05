import { useCallback, useState } from 'react';
import { useRankingHistory } from '../data/useRankingHistory';
import { useIsMobile } from 'redux/selector/mobile';
import showMessage from 'utils/setGlobalComponentsInfo';
import { useClaim } from '../data/useClaim';
import useInitLeaderBoard from '../hooks/useInitLeaderBoard';
import { divDecimalsStr } from 'utils/calculate';
import ShowNFTModal from 'components/CommonModal/ShowNFTModal';
import { ShowBeanPassType } from 'components/CommonModal/type';
import { IClaimableInfoResult } from '../data/types';

export const PastRecordContent = () => {
  const { data } = useRankingHistory();
  const isMobile = useIsMobile();
  const claimAward = useClaim();
  const { initialize } = useInitLeaderBoard();
  const [isShowNFT, setIsShowNFT] = useState(false);
  const [claimInfo, setClaimInfo] = useState<IClaimableInfoResult>();

  const onClaim = useCallback(async () => {
    showMessage.loading();
    try {
      const result = await claimAward();
      setClaimInfo(result);
      setIsShowNFT(true);
      initialize();
    } catch (error) {
      console.log('err', error);
      showMessage.error('claim failed');
    } finally {
      showMessage.hideLoading();
    }
  }, [claimAward, initialize]);

  return (
    <div className="flex flex-col overflow-y-auto space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1">
      <div
        className={`flex  ${
          isMobile ? 'text-[12px]' : 'text-[16px]'
        } leading-[18px] text-[#AE694C] bg-[#DEC49D] px-[16px] py-[9px] text-left rounded-[5px]`}>
        <div className="flex-1">Time</div>
        <div className={`${isMobile ? 'flex-1' : 'w-[120px]'}`}>$ACORNS</div>
        <div className={`${isMobile ? 'w-[120px]' : 'flex-1'}`}>Rank</div>
      </div>
      <ShowNFTModal
        open={isShowNFT}
        beanPassItem={claimInfo?.kingHamsterInfo}
        onCancel={() => setIsShowNFT(false)}
        type={ShowBeanPassType.Success}
      />
      <div className="overflow-y-auto h-full">
        {data?.map((item, i) => (
          <div
            key={i}
            className={`flex ${isMobile ? 'text-[12px] h-[36px] ' : 'text-[16px] items-center h-[52px]'} 
                ${item?.rewardNftInfo ? 'h-[64px] py-[12px]' : 'items-center'}
            leading-[18px] text-[#953D22] text-left  border-b-[1px] border-[#D3B68A]`}>
            <div className="flex-1">{item.time}</div>
            <div className={`${isMobile ? 'flex-1' : 'w-[120px]'}`}>
              {divDecimalsStr(item.score, item.decimals) ?? 'N/A'}
            </div>
            <div className={`flex justify-between  ${isMobile ? 'flex-col w-[120px]' : 'items-center flex-1'}`}>
              <span>{item.rank === -1 ? '-' : item.rank?.toLocaleString()}</span>
              {item.rewardNftInfo && (
                <div
                  onClick={onClaim}
                  className={`font-black text-white bg-[#A15A1C] text-center rounded-[6px] ${
                    isMobile
                      ? 'px-1 py-[3px] text-[10px] leading-[10px] w-[120px]'
                      : 'px-2 py-[5px] text-xs leading-[22px]'
                  }`}>
                  Claim NFT Rewards
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
