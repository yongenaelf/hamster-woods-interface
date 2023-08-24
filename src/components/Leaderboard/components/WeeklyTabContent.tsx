import { useWeeklyRank } from '../data/useWeeklyRank';
import { TabContent } from './TabContent';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();

  return <TabContent data={data} />;
};
