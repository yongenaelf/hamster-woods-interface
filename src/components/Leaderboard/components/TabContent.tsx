import { useIsMobile } from 'redux/selector/mobile';
import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { LeaderBoardItem } from './LeaderBoardItem';
import { TabContentUser } from './TabContentUser';
import { MAX_LEADERBOARD_ITEMS } from 'constants/platform';

type IData = IWeeklyRankResult | ISeasonRankResult;
interface ITabContent extends React.PropsWithChildren {
  data?: IData;
  emptyText: string;
}

export const TabContent = ({ data, emptyText, children }: ITabContent) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      {children}
      {!data?.rankingList || data?.rankingList.length === 0 ? (
        <div className="flex flex-grow items-center justify-center bg-blue-700">
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
