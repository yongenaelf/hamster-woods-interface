import { useIsMobile } from 'redux/selector/mobile';
import { IRankResult } from '../data/rankResult';
import { LeaderBoardItem } from './LeaderBoardItem';
import { TabContentUser } from './TabContentUser';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';

export const TabContent = ({ data, refreshTime }: { data?: IRankResult; refreshTime: string }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <div
        className={`mt-2 rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 pb-0 shadow-inner ${
          isMobile ? 'text-md' : 'text-xl'
        }`}>
        <span className="mr-4 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-fonarto text-white text-stroke-black font-bold">
          i
        </span>
        <span className="text-white opacity-60">Next update: {refreshTime}</span>
      </div>
      {!data?.rankingList || data?.rankingList.length === 0 ? (
        <div className="flex flex-grow items-center justify-center bg-blue-700">
          <div className={`${isMobile ? 'px-8' : 'px-32'}`}>
            <img
              src={require('assets/images/no-record.png').default.src}
              alt="No Record"
              className={`mx-auto w-32 mb-8`}
            />
            <div className={`text-center font-roboto text-[#89A5F5] ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              Leaderboards will be displayed at the end of the first week of rankings.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-full w-full flex-col bg-blue-700 p-4 shadow-inner">
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
                {data?.rankingList.length < MAX_LEADERBOARD_ITEMS
                  ? Array(MAX_LEADERBOARD_ITEMS - data.rankingList.length)
                      .fill('')
                      .map((_i, j) => (
                        <div
                          key={j}
                          className={`flex text-slate-500 text-lg items-center bg-blue-800 rounded-2xl mb-2 ${
                            isMobile ? 'h-20' : 'h-24'
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
