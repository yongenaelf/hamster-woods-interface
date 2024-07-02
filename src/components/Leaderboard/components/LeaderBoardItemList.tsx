import { IWeeklyRankResult, ISeasonRankResult } from '../data/types';
import { LeaderBoardItem } from './LeaderBoardItem';
import { MAX_LEADERBOARD_EMPTY } from 'constants/platform';
import styles from './style.module.css';
import useGetState from 'redux/state/useGetState';
import { useIsMobile } from 'redux/selector/mobile';
import { useCallback } from 'react';

const EmptyItem = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex text-slate-500 text-lg items-center bg-[#DEC49D] rounded-full h-[40px] ${
        isMobile ? 'mb-2' : 'mb-3'
      } `}>
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

const mockData = {
  rankingList: [
    {
      rank: 1,
      caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
      score: 100,
    },
    {
      rank: 2,
      caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
      score: 100,
    },
    {
      rank: 3,
      caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
      score: 100000000,
    },
    {
      rank: 4,
      caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
      score: 100000000,
    },
    {
      rank: 5,
      caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
      score: 10,
    },
  ],
  selfRank: {
    rank: 5,
    caAddress: 'ELF_LEwNefrRAcYtQWFvTZTXykPca7QrijatqgbmAqB5M4Ud2yJGL_AELF',
    score: 100,
  },
};

export const LeaderBoardItemList = ({ data }: ILeaderBoardItemList) => {
  const length = data?.rankingList?.length ?? 0;

  return (
    <div className={`flex flex-grow w-full flex-col`}>
      <div className="h-[4px] flex-grow overflow-y-hidden">
        <div className={`${styles.scrollbar} h-full overflow-y-auto`}>
          {mockData?.rankingList?.map((i) => (
            <LeaderBoardItem
              key={i.rank}
              rank={i.rank}
              address={i.caAddress}
              beans={i.score}
              isCurrentUserRank={i.rank === mockData.selfRank.rank}
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
