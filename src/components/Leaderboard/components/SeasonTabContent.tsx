import { useSeasonRank } from '../data/useSeasonRank';
import { TabContent } from './TabContent';

export const SeasonTabContent = () => {
  const { data } = useSeasonRank();

  return (
    <TabContent
      data={data}
      emptyText="The seasonal leaderboard will be displayed after the first weekly challenge ends and its data will be updated on a weekly basis. ">
      <div className={`rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-2 shadow-inner`}></div>
    </TabContent>
  );
};
