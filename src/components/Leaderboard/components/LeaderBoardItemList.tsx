import { useIsMobile } from 'redux/selector/mobile';
import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { LeaderBoardItem } from './LeaderBoardItem';
import { MAX_LEADERBOARD_EMPTY } from 'constants/platform';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';

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

  const { isMobile } = useGetState();

  return (
    <div className={`flex flex-grow w-full flex-col bg-blue-700 ${isMobile ? 'p-[8px]' : 'p-[16px]'} shadow-inner`}>
      <div className="h-[4px] flex-grow overflow-y-hidden">
        <div className={`${styles.scrollbar} h-full overflow-y-auto`}>
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
