import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();

  return <TabContent data={data} />;
};
