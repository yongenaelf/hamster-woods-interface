import { useWeeklyRank } from '../data/useWeeklyRank';

export const useLeaderboardStarted = () => {
  const { data } = useWeeklyRank();

  if (!data) return false;

  return !(data.status === 0 && data.refreshTime === null);
};
