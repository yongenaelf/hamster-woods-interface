import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { TabContent } from './TabContent';
import { useMemo } from 'react';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  return (
    <>
      <TabContent
        data={data}
        emptyText="Leaderboards will be displayed at the end of the first week of rankings."
        infoText="This weekly challenge ends in: "
        endedText="This weekly challenge has ended and rewards will be distributed shortly."
      />
      <LeaderBoardInfoModal>
        <p className="text-white text-lg mb-4">
          Your weekly score (number of Beans earned) will be updated until the weekly challenge ends. The weekly ranking
          will be confirmed {confirmedDate} and the rewards will be distributed to the top 30 players shortly. Players
          with the same score will be ranked in the order they achieve the score, giving higher ranking to early
          achievers.
        </p>
      </LeaderBoardInfoModal>
    </>
  );
};
