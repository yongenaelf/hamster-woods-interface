import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank('21mEqQqL1L79QDcryCCbFPv9nYjj7SCefsBrXMMkajE7iFmgkD');

  return <TabContent data={data} refreshTime="6d 22:12:34" />;
};
