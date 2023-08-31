import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { TabContentUser } from './TabContentUser';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { dispatch } from 'redux/store';
import { toggleShowLeaderboardInfo } from 'redux/reducer/info';
import { RefreshTime } from './RefreshTime';
import { LeaderBoardItemList } from './LeaderBoardItemList';
import { LeaderBoardNoRecord } from './LeaderBoardNoRecord';
import { LeaderBoardTopSection } from './LeaderBoardTopSection';

type IData = IWeeklyRankResult | ISeasonRankResult;
interface ITabContent {
  data?: IData;
  topText: string | null;
  showCountdown?: boolean;
  notAvailable?: boolean;
}
export const TabContent = ({ data, topText, showCountdown, notAvailable }: ITabContent) => {
  const refreshTime = data?.refreshTime;

  return (
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <LeaderBoardTopSection
        onClick={() => {
          if (!notAvailable) dispatch(toggleShowLeaderboardInfo());
        }}>
        {topText && !notAvailable ? (
          showCountdown && refreshTime ? (
            <RefreshTime refreshTime={refreshTime} text={topText as string} />
          ) : (
            topText
          )
        ) : null}
      </LeaderBoardTopSection>
      {!data?.rankingList || notAvailable ? (
        <LeaderBoardNoRecord>
          Leaderboard not available now. Please stay tuned for upcoming challenges.
        </LeaderBoardNoRecord>
      ) : (
        <>
          <LeaderBoardItemList data={data} />
          <TabContentUser
            showMeIcon={data?.selfRank.rank >= MAX_LEADERBOARD_ITEMS}
            rank={data?.selfRank.rank}
            score={data?.selfRank.score}
            address={data?.selfRank.caAddress}
          />
        </>
      )}
    </div>
  );
};
