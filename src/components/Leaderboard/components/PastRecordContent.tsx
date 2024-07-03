import { useCallback } from 'react';
import { useRankingHistory } from '../data/useRankingHistory';
import { useIsMobile } from 'redux/selector/mobile';
import showMessage from 'utils/setGlobalComponentsInfo';
import { useClaim } from '../data/useClaim';
import useInitLeaderBoard from '../hooks/useInitLeaderBoard';

export const PastRecordContent = () => {
  const { data } = useRankingHistory();
  const isMobile = useIsMobile();
  const claimAward = useClaim();
  const { initialize } = useInitLeaderBoard();

  const onClaim = useCallback(async () => {
    showMessage.loading();
    try {
      await claimAward();
      await initialize();
    } catch (error) {
      console.log('err', error);
      showMessage.error('claim failed');
    } finally {
      showMessage.hideLoading();
    }
  }, [claimAward, initialize]);

  return (
    <div className="flex flex-col overflow-y-auto space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1">
      <div className="flex text-[16px] leading-[18px] text-[#AE694C] bg-[#DEC49D] px-[16px] py-[9px] text-left rounded-[5px]">
        <div className="flex-1">Time</div>
        <div className="flex-none w-[140px]">$ACORNS</div>
        <div className="flex-1">Rank</div>
      </div>
      <div className="overflow-y-auto h-full">
        {data?.map((item, i) => (
          <div
            key={i}
            className="flex h-[52px] text-[16px] leading-[18px] text-[#953D22] pl-4 pr-4 text-left items-center border-b-[1px] border-[#D3B68A]">
            <div className="flex-1">{item.time}</div>
            <div className="flex-none w-[140px]">{item.score.toLocaleString() ?? 'N/A'}</div>
            <div className="flex-1 flex justify-between items-center">
              <span>{item.rank === -1 ? '-' : item.rank.toLocaleString()}</span>
              {item.rewardNftInfo && (
                <div
                  onClick={onClaim}
                  className={`font-black text-white bg-[#A15A1C] text-center rounded-[6px] ${
                    isMobile ? 'px-1 py-[3px] text-[10px] leading-[10px]' : 'px-2 py-[5px] text-xs leading-[22px]'
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
