import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { useMemo, useState } from 'react';
import { ChallengeStatus } from '../data/types';
import { AppState, useSelector } from 'redux/store';
import WeeklyPrizes from './WeeklyPrizes';
import TipIcon from 'assets/images/Tip.png';
import { LeaderBoardNoRecord } from './LeaderBoardNoRecord';
import { LeaderBoardItemList } from './LeaderBoardItemList';
import { useIsMobile } from 'redux/selector/mobile';

const rewardSelector = (state: AppState) => state.configInfo.configInfo?.leaderboardWeekAward;

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();
  const [weeklyPrizeOpen, setWeeklyPrizeOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="flex w-full flex-grow flex-col m-0">
        <div className={`flex items-center justify-start space-x-[8px] ${isMobile ? 'mb-2' : 'mb-4'}`}>
          <img width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} src={TipIcon.src} alt="tip" />
          <div className={`${isMobile ? 'text-[12px]' : 'text-[16px]'} leading-[18px] font-bold`}>
            {data?.status === ChallengeStatus.InProgress
              ? 'Hop & Win Week X will end on YY.'
              : 'Hop & Win Week X has ended.'}{' '}
            Click{' '}
            <span className="underline font-black" onClick={() => setWeeklyPrizeOpen(true)}>
              here
            </span>{' '}
            to learn more about the event and its prizes.
          </div>
        </div>
        {data?.rankingList.length ? (
          <LeaderBoardNoRecord>{`Leaderboards will be display at the end of the first week of rankings.`}</LeaderBoardNoRecord>
        ) : (
          <LeaderBoardItemList data={data} />
        )}
      </div>
      <WeeklyPrizes open={weeklyPrizeOpen} onCancel={() => setWeeklyPrizeOpen(false)} />
    </>
  );
};
