import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { TabContentUser } from './TabContentUser';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { RefreshTime } from './RefreshTime';
import { LeaderBoardItemList } from './LeaderBoardItemList';
import { LeaderBoardNoRecord } from './LeaderBoardNoRecord';
import { LeaderBoardTopSection } from './LeaderBoardTopSection';

type IData = IWeeklyRankResult | ISeasonRankResult;
interface ITabContent {
  data?: IData;
  topText?: string;
  emptyText?: string;
  showEmptyText?: boolean;
}
export const TabContent = ({ data, topText, emptyText, showEmptyText }: ITabContent) => {
  const refreshTime = data?.refreshTime;
  const status = data?.status;

  return (
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <LeaderBoardTopSection
        onClick={() => {
          // dispatch(toggleShowLeaderboardInfo());
        }}>
        {topText ? (
          status === 0 && refreshTime ? (
            <RefreshTime refreshTime={refreshTime} text={topText} />
          ) : (
            topText
          )
        ) : null}
      </LeaderBoardTopSection>
      {showEmptyText ? (
        <LeaderBoardNoRecord>{emptyText}</LeaderBoardNoRecord>
      ) : (
        <>
          <LeaderBoardItemList data={data} />
          <TabContentUser
            showMeIcon={data && data.selfRank.rank >= MAX_LEADERBOARD_ITEMS}
            rank={data?.selfRank.rank}
            score={data?.selfRank.score}
            address={data?.selfRank.caAddress}
          />
        </>
      )}
    </div>
  );
};
