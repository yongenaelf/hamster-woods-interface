import { useWeeklyRank } from "../data/useWeeklyRank";
import { TabContent } from "./TabContent";

export const WeeklyTabContent = () => {
  const { data } = useWeeklyRank("test");

  return <TabContent data={data} refreshTime="6d 22:12:34" />;
};
