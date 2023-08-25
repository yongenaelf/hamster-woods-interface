import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { TabContent } from './TabContent';
import { useMemo } from 'react';
import { WeeklyChallengeStatus } from '../data/types';
import { dispatch } from 'redux/store';
import { toggleShowLeaderboardInfo } from 'redux/reducer/info';
import { useIsMobile } from 'redux/selector/mobile';
import { RefreshTime } from './RefreshTime';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();
  const isMobile = useIsMobile();

  const refreshTime = data?.refreshTime;

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  const textClassName = `${isMobile ? 'text-md' : 'text-lg'} text-white text-left mb-4`;

  return (
    <>
      <TabContent data={data} emptyText="Leaderboards will be displayed at the end of the first week of rankings.">
        <div
          onClick={() => dispatch(toggleShowLeaderboardInfo())}
          className={`rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 pb-0 shadow-inner text-left ${
            isMobile ? 'text-md' : 'text-xl'
          }`}>
          <span className="mr-2 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-fonarto text-white font-bold">
            i
          </span>
          <span className="text-white opacity-60">
            {refreshTime ? <RefreshTime refreshTime={refreshTime} text="This weekly challenge ends in: " /> : null}
          </span>
        </div>
      </TabContent>
      <LeaderBoardInfoModal>
        {data?.status === WeeklyChallengeStatus.InProgress ? (
          <p className={textClassName}>
            Your weekly score (number of Beans earned) will be updated until the weekly challenge ends. The weekly
            ranking will be confirmed {confirmedDate} and the rewards will be distributed to the top 30 players shortly.
            Players with the same score will be ranked in the order they achieve the score, giving higher ranking to
            early achievers.
          </p>
        ) : null}
        {data?.status === WeeklyChallengeStatus.Settlement ? (
          <p className={textClassName}>
            Your weekly score (number of Beans earned) has been finalized. The rewards will be distributed to the top 30
            players soon. The next weekly challenge will start {confirmedDate}.
          </p>
        ) : null}
      </LeaderBoardInfoModal>
    </>
  );
};
