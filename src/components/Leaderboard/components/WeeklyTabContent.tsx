import { useWeeklyRank } from '../data/useWeeklyRank';
import { TabContent } from './TabContent';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank('21mEqQqL1L79QDcryCCbFPv9nYjj7SCefsBrXMMkajE7iFmgkD');

  return <TabContent data={data} refreshTime="6d 22:12:34" />;
};
