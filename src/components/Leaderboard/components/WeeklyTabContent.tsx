import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { TabContent } from './TabContent';
import { useMemo } from 'react';
import { ChallengeStatus } from '../data/types';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  const topText =
    data?.status === ChallengeStatus.InProgress
      ? 'This weekly challenge ends in: '
      : 'This weekly challenge has ended and rewards will be distributed shortly.';

  return (
    <>
      <TabContent
        data={data}
        emptyText="Leaderboards will be displayed at the end of the first week of rankings."
        topText={topText}
        showCountdown={data?.status === ChallengeStatus.InProgress}
      />
      <LeaderBoardInfoModal>
        {data?.status === ChallengeStatus.InProgress ? (
          <>
            Your weekly score (number of Beans earned) will be updated until the weekly challenge ends. The weekly
            ranking will be confirmed {confirmedDate} and the rewards will be distributed to the top 30 players shortly.
            Players with the same score will be ranked in the order they achieve the score, giving higher ranking to
            early achievers.
          </>
        ) : null}
        {data?.status === ChallengeStatus.Settlement ? (
          <>
            Your weekly score (number of Beans earned) has been finalized. The rewards will be distributed to the top 30
            players soon. The next weekly challenge will start {confirmedDate}.
          </>
        ) : null}
        {data?.status === ChallengeStatus.LastSettlement ? (
          <>
            Your weekly score (number of Beans earned) has been finalized. The rewards will be distributed to the top 30
            players soon.
          </>
        ) : null}
      </LeaderBoardInfoModal>
    </>
  );
};
