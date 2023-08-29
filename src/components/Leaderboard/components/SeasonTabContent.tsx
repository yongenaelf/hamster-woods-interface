import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';
import { parseISO, format } from 'date-fns';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { useMemo } from 'react';
import { ChallengeStatus } from '../data/types';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  const seasonName = data?.seasonName;

  const topText =
    data?.status === ChallengeStatus.InProgress
      ? 'Next leaderboard updates on '
      : data?.status === ChallengeStatus.Settlement
      ? `${seasonName} has ended and rewards will be distributed shortly.`
      : '';

  return (
    <>
      <TabContent
        data={data}
        emptyText="The seasonal leaderboard will be displayed after the first weekly challenge ends and its data will be updated on a weekly basis. "
        topText={topText}
        showCountdown={data?.status === ChallengeStatus.InProgress}
      />
      <LeaderBoardInfoModal>
        {data?.status === ChallengeStatus.InProgress ? (
          <>
            The seasonal leaderboard ranks players based on their highest weekly score (number of Beans earned) during
            the season. Ranking of this season will be confirmed {confirmedDate} and the rewards will be distributed to
            the top 10 players shortly. Players with the same score will be ranked in the order they achieve the score,
            giving higher ranking to early achievers.
          </>
        ) : null}
        {data?.status === ChallengeStatus.Settlement ? (
          <>
            The ranking for {seasonName} has been finalized and the rewards will be distributed to the top 10 players
            soon.
          </>
        ) : null}
      </LeaderBoardInfoModal>
    </>
  );
};
