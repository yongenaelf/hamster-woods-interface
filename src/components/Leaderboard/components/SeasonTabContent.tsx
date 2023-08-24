import { useMemo } from 'react';
import { useSeasonRank } from '../data/useSeasonRank';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { TabContent } from './TabContent';
import { format, parseISO } from 'date-fns';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  return (
    <>
      <TabContent
        data={data}
        emptyText="The seasonal leaderboard will be displayed after the first weekly challenge ends and its data will be updated on a weekly basis. "
        infoText="Next leaderboard updates in: "
        endedText="Season has ended and rewards will be distributed shortly."
      />
      <LeaderBoardInfoModal>
        <p className="text-white text-lg mb-4">
          The seasonal leaderboard ranks players based on their highest weekly score (number of Beans earned) during the
          season. Ranking of this season will be confirmed {confirmedDate} and the rewards will be distributed to the
          top 10 players shortly. Players with the same score will be ranked in the order they achieve the score, giving
          higher ranking to early achievers.
        </p>
      </LeaderBoardInfoModal>
    </>
  );
};
