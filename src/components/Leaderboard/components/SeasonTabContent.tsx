import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';
import { parseISO, format } from 'date-fns';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { useMemo } from 'react';
import { ChallengeStatus } from '../data/types';
import { AppState, useSelector } from 'redux/store';

const rewardSelector = (state: AppState) => state.configInfo.configInfo?.leaderboardSeasonAward;

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();
  const rewards = useSelector(rewardSelector);

  const top = useMemo(() => {
    if (!rewards || rewards.length === 0) return '';

    return rewards.slice(-1)[0].text.split('-').pop() ?? '';
  }, [rewards]);

  const confirmedDate = useMemo(() => {
    if (!data?.refreshTime) return '';

    const refreshTime = data.refreshTime;

    return `on ${format(parseISO(refreshTime), "MMMM do 'at' HH:mm")} (UTC)`;
  }, [data?.refreshTime]);

  const seasonName = data?.seasonName;

  const FIRST_WEEK =
    data?.status === ChallengeStatus.InProgress && data.rankingList.length === 0 && data.refreshTime !== null;
  const FIRST_WEEK_TEXT =
    'The seasonal leaderboard will be displayed after the first weekly challenge ends and its data will be updated on a weekly basis.';

  const topText = data?.refreshTime
    ? 'Next leaderboard updates on '
    : `${seasonName ?? 'Season'} has ended and rewards will be distributed shortly.`;

  return (
    <>
      <TabContent data={data} topText={topText} emptyText={FIRST_WEEK_TEXT} showEmptyText={FIRST_WEEK} />
      <LeaderBoardInfoModal data={rewards}>
        {FIRST_WEEK ? (
          <>{FIRST_WEEK_TEXT}</>
        ) : data?.status === ChallengeStatus.Settlement ? (
          <>
            The ranking for {seasonName} has been finalized and the rewards will be distributed to the top {top} players
            soon.
          </>
        ) : (
          <>
            The seasonal leaderboard ranks players based on their highest weekly score (number of Beans earned) during
            the season.
            <br />
            Ranking of this season will be confirmed {confirmedDate} and the rewards will be distributed to the top{' '}
            {top} players shortly. Players with the same score will be ranked in the order they achieve the score,
            giving higher ranking to early achievers.
          </>
        )}
      </LeaderBoardInfoModal>
    </>
  );
};
