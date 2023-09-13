import { useState } from 'react';
import { WeeklyTabContent } from './components/WeeklyTabContent';
import { SeasonTabContent } from './components/SeasonTabContent';
import { PastRecordContent } from './components/PastRecordContent';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowLeaderboard } from 'redux/reducer/info';
import LeaderBoardModal from './components/LeaderBoardModal';
import { useLeaderboardStarted } from './hooks/useLeaderboardStarted';
import LeaderBoardNotStartedModal from './components/LeaderBoardNotStartedModal';

enum Tabs {
  Weekly = 'Weekly',
  Season = 'Seasonal',
  PastRecord = 'Past Records',
}

const _tabClassName =
  'w-1/3 rounded-tl-lg h-auto rounded-tr-lg shadow-inner text-white flex items-center justify-center font-fonarto font-bold';

export const Leaderboard = () => {
  const open = useSelector((state) => state.info.showLeaderboard);
  const started = useLeaderboardStarted();
  const [tab, setTab] = useState<Tabs>(Tabs.Weekly);
  const isMobile = useIsMobile();

  const tabClassName = `${_tabClassName} ${
    isMobile ? 'text-[14px] leading-[16px] py-[8px]' : 'text-[20px] leading-[24px] py-[11px]'
  }`;

  const onCancel = () => dispatch(toggleShowLeaderboard());

  if (!started) return <LeaderBoardNotStartedModal open={open} onCancel={onCancel} />;

  return (
    <LeaderBoardModal open={open} title="Leader Board" onCancel={onCancel} destroyOnClose>
      <div className={`${isMobile ? 'h-[33rem]' : 'h-[41rem]'}`}>
        <div className="flex flex-col h-full">
          <div className={`${isMobile ? 'mx-[16px]' : 'mx-[40px]'} flex`}>
            <button
              className={`${tabClassName} ${tab === Tabs.Weekly ? 'bg-[#79A3DC]' : 'bg-[#144CEA]'}`}
              onClick={() => setTab(Tabs.Weekly)}>
              {Tabs.Weekly}
            </button>
            <button
              className={`${tabClassName} ${tab === Tabs.Season ? 'bg-[#79A3DC]' : 'bg-[#144CEA]'}`}
              onClick={() => setTab(Tabs.Season)}>
              {Tabs.Season}
            </button>
            <button
              className={`${tabClassName} ${tab === Tabs.PastRecord ? 'bg-[#79A3DC]' : 'bg-[#144CEA]'}`}
              onClick={() => setTab(Tabs.PastRecord)}>
              {Tabs.PastRecord}
            </button>
          </div>
          {tab === Tabs.Weekly ? <WeeklyTabContent /> : null}
          {tab === Tabs.Season ? <SeasonTabContent /> : null}
          {tab === Tabs.PastRecord ? <PastRecordContent /> : null}
        </div>
      </div>
    </LeaderBoardModal>
  );
};

export default Leaderboard;
