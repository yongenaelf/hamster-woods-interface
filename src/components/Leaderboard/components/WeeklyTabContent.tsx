import { useWeeklyRank } from '../data/useWeeklyRank';
import { TabContent } from './TabContent';

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank();

  return (
    <TabContent
      data={data}
      emptyText="Leaderboards will be displayed at the end of the first week of rankings."
      infoText="This weekly challenge ends in: "
      endedText="This weekly challenge has ended and rewards will be distributed shortly."
    />
  );
};
