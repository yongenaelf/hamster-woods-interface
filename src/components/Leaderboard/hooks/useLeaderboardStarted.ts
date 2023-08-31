import { useWeeklyRank } from '../data/useWeeklyRank';

export const useLeaderboardStarted = () => {
  const { data } = useWeeklyRank();

  return !(data?.status === 0 && data.refreshTime === null);
};
