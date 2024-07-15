import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { useMemo, useState } from 'react';
import { ChallengeStatus } from '../data/types';
import { AppState } from 'redux/store';
import WeeklyPrizes from './WeeklyPrizes';
import TipIcon from 'assets/images/tip.png';
import { LeaderBoardNoRecord } from './LeaderBoardNoRecord';
import { LeaderBoardItemList } from './LeaderBoardItemList';
import { useIsMobile } from 'redux/selector/mobile';
import { LeaderBoardSettleList } from './LeaderBoardSettleList';
import { TabContentUser } from './TabContentUser';

const rewardSelector = (state: AppState) => state.configInfo.configInfo?.leaderboardWeekAward;

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();
  const [weeklyPrizeOpen, setWeeklyPrizeOpen] = useState(false);
  const isMobile = useIsMobile();

  const isSettled = useMemo<boolean>(() => {
    return !!data?.settleDaySelfRank && !!data.settleDayRankingList;
  }, [data?.settleDayRankingList, data?.settleDaySelfRank]);

  return (
    <>
      <div className="flex w-full flex-grow flex-col m-0">
        <div className={`flex items-center justify-start space-x-[8px] ${isMobile ? 'mb-2' : 'mb-4'}`}>
          <img
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
            className={`${isMobile ? 'w-[20px] h-[20px]' : 'w-[16Px] h-[16Px]'}`}
            src={TipIcon.src}
            alt="tip"
          />
          <div className={`${isMobile ? 'text-[12px]' : 'text-[16px]'} leading-[18px] font-bold`}>
            {isSettled
              ? `Hop & Win Week ${data?.weekNum} has ended.`
              : `Hop & Win Week ${data?.weekNum} will end after ${data?.endDate}.`}{' '}
            Click{' '}
            <span className="underline font-black text-[#3989FF]" onClick={() => setWeeklyPrizeOpen(true)}>
              here
            </span>{' '}
            to learn more about the event and its prizes.
          </div>
        </div>
        {isSettled &&
          (data?.settleDayRankingList?.length ? (
            <LeaderBoardSettleList data={data} />
          ) : (
            <LeaderBoardNoRecord>{`Leaderboards will be display at the end of the first week of rankings.`}</LeaderBoardNoRecord>
          ))}
        {!isSettled &&
          (data?.rankingList?.length ? (
            <LeaderBoardItemList data={data} />
          ) : (
            <LeaderBoardNoRecord>{`Leaderboards will be display at the end of the first week of rankings.`}</LeaderBoardNoRecord>
          ))}
      </div>
      <WeeklyPrizes open={weeklyPrizeOpen} onCancel={() => setWeeklyPrizeOpen(false)} />
    </>
  );
};
