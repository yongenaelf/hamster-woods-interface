import { useSeasonRank } from "../data/useSeasonRank";
import { TabContent } from "./TabContent";

export const SeasonTabContent = () => {
  const { data } = useSeasonRank("test");

  return <TabContent data={data} refreshTime="6d 22:12:34" />;
};
