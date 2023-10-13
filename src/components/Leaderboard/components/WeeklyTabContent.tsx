import { parseISO, format } from 'date-fns';
import { useWeeklyRank } from '../data/useWeeklyRank';
import { LeaderBoardInfoModal } from './LeaderBoardInfoModal';
import { TabContent } from './TabContent';
import { useMemo } from 'react';
import { ChallengeStatus } from '../data/types';
import { AppState, useSelector } from 'redux/store';

const rewardSelector = (state: AppState) => state.configInfo.configInfo?.leaderboardWeekAward;

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();
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

  const topText =
    data?.status === ChallengeStatus.InProgress
      ? 'This weekly challenge ends in: '
      : 'This weekly challenge has ended and rewards will be distributed shortly.';

  return (
    <>
      <TabContent data={data} topText={topText} />
      <LeaderBoardInfoModal data={rewards}>
        {data?.status === ChallengeStatus.InProgress ? (
          <>
            Your weekly score (number of Beans earned) will be updated until the weekly challenge ends. The weekly
            ranking will be confirmed {confirmedDate} and the rewards will be distributed to the top {top} players
            shortly. Players with the same score will be ranked in the order they achieve the score, giving higher
            ranking to early achievers.
          </>
        ) : null}
        {data?.status === ChallengeStatus.Settlement ? (
          <>
            Your weekly score (number of Beans earned) has been finalized. The rewards will be distributed to the top{' '}
            {top} players soon. The next weekly challenge will start {confirmedDate}.
          </>
        ) : null}
        {data?.status === ChallengeStatus.LastSettlement ? (
          <>
            Your weekly score (number of Beans earned) has been finalized. The rewards will be distributed to the top{' '}
            {top} players soon.
          </>
        ) : null}
      </LeaderBoardInfoModal>
    </>
  );
};
