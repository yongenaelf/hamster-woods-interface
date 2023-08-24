import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();

  return (
    <TabContent
      data={data}
      emptyText="The seasonal leaderboard will be displayed after the first weekly challenge ends and its data will be updated on a weekly basis. "
      infoText="Next leaderboard updates in: "
      endedText="Season has ended and rewards will be distributed shortly."
    />
  );
};
