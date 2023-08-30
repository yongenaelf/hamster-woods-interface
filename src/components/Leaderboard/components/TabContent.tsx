import { useIsMobile } from 'redux/selector/mobile';
import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { LeaderBoardItem } from './LeaderBoardItem';
import { TabContentUser } from './TabContentUser';
import { MAX_LEADERBOARD_EMPTY, MAX_LEADERBOARD_ITEMS } from 'constants/platform';
import { dispatch } from 'redux/store';
import { toggleShowLeaderboardInfo } from 'redux/reducer/info';
import { RefreshTime } from './RefreshTime';

type IData = IWeeklyRankResult | ISeasonRankResult;
interface ITabContent {
  data?: IData;
  emptyText: string;
  topText: string | null;
  showCountdown?: boolean;
}

export const TabContent = ({ data, emptyText, topText, showCountdown }: ITabContent) => {
  const isMobile = useIsMobile();

  const refreshTime = data?.refreshTime;

  return (
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <div
        className={`rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 pb-0 shadow-inner text-left ${
          isMobile ? 'text-md' : 'text-xl'
        }`}>
        {topText ? (
          <div onClick={() => dispatch(toggleShowLeaderboardInfo())}>
            <span className="mr-2 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-fonarto text-white font-bold">
              i
            </span>
            <span className="text-white opacity-60">
              {showCountdown && refreshTime ? (
                <RefreshTime refreshTime={refreshTime} text={topText as string} />
              ) : (
                topText
              )}
            </span>
          </div>
        ) : null}
      </div>
      {!data?.rankingList || data?.rankingList.length === 0 ? (
        <div className="flex flex-grow items-center justify-center bg-blue-700 rounded-bl-xl rounded-br-xl">
          <div className={`${isMobile ? 'px-8' : 'px-32'}`}>
            <img
              src={require('assets/images/no-record.png').default.src}
              alt="No Record"
              className={`mx-auto w-32 mb-8`}
            />
            <div className={`text-center font-roboto text-[#89A5F5] ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              {emptyText}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-grow w-full flex-col bg-blue-700 p-4 shadow-inner">
            <div className="-mr-4 h-1 flex-grow overflow-y-scroll">
              <div className="h-full overflow-y-auto">
                {data?.rankingList.map((i) => (
                  <LeaderBoardItem
                    key={i.rank}
                    rank={i.rank}
                    address={i.caAddress}
                    beans={i.score}
                    isCurrentUserRank={i.rank === data.selfRank.rank}
                  />
                ))}
                {data?.rankingList.length < MAX_LEADERBOARD_EMPTY
                  ? Array(MAX_LEADERBOARD_EMPTY - data.rankingList.length)
                      .fill('')
                      .map((_i, j) => (
                        <div
                          key={j}
                          className={`flex text-slate-500 text-lg items-center bg-blue-800 rounded-2xl mb-2 ${
                            isMobile ? 'h-12' : 'h-24'
                          }`}>
                          <div className="px-10">&mdash;</div>
                          <div className="grow"></div>
                          <div className="px-10">&mdash;</div>
                        </div>
                      ))
                  : null}
              </div>
            </div>
          </div>
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
