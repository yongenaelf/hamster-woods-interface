import { useIsMobile } from 'redux/selector/mobile';
import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { LeaderBoardItem } from './LeaderBoardItem';
import { MAX_LEADERBOARD_EMPTY } from 'constants/platform';

const EmptyItem = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex text-slate-500 text-lg items-center bg-blue-800 rounded-2xl mb-2 ${isMobile ? 'h-12' : 'h-16'}`}>
      <div className="px-10">&mdash;</div>
      <div className="grow"></div>
      <div className="px-10">&mdash;</div>
    </div>
  );
};

type IData = IWeeklyRankResult | ISeasonRankResult;
interface ILeaderBoardItemList {
  data?: IData;
}
export const LeaderBoardItemList = ({ data }: ILeaderBoardItemList) => {
  const length = data?.rankingList?.length ?? 0;

  return (
    <div className="flex flex-grow w-full flex-col bg-blue-700 p-4 shadow-inner">
      <div className="-mr-4 h-1 flex-grow overflow-y-scroll">
        <div className="h-full overflow-y-auto">
          {data?.rankingList?.map((i) => (
            <LeaderBoardItem
              key={i.rank}
              rank={i.rank}
              address={i.caAddress}
              beans={i.score}
              isCurrentUserRank={i.rank === data.selfRank.rank}
            />
          ))}
          {length < MAX_LEADERBOARD_EMPTY
            ? Array(MAX_LEADERBOARD_EMPTY - length)
                .fill('')
                .map((_i, j) => <EmptyItem key={j} />)
            : null}
        </div>
      </div>
    </div>
  );
};
