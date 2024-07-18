import { useState } from 'react';

import { WeeklyTabContent } from './components/WeeklyTabContent';
import { PastRecordContent } from './components/PastRecordContent';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowLeaderboard } from 'redux/reducer/info';
import LeaderBoardModal from './components/LeaderBoardModal';
import { useLeaderboardStarted } from './hooks/useLeaderboardStarted';
import LeaderBoardNotStartedModal from './components/LeaderBoardNotStartedModal';
import { TabContentUser } from './components/TabContentUser';

enum Tabs {
  Weekly = 'Weekly',
  PastRecord = 'Past Records',
}

const _tabClassName =
  'w-1/2 rounded-tl-lg h-auto rounded-tr-lg shadow-inner text-[#953D22] flex items-center justify-center font-paytone font-bold';

export const Leaderboard = () => {
  const open = useSelector((state) => state?.info?.showLeaderboard);
  const started = useLeaderboardStarted();
  const [tab, setTab] = useState<Tabs>(Tabs.Weekly);
  const isMobile = useIsMobile();

  const tabClassName = `${_tabClassName} ${
    isMobile ? 'text-[14px] leading-[16px] py-[8px]' : 'text-[20px] leading-[24px] py-[11px]'
  }`;
  const onCancel = () => {
    dispatch(toggleShowLeaderboard());
  };

  if (!started) return <LeaderBoardNotStartedModal open={open} onCancel={onCancel} />;

  return (
    <>
      <LeaderBoardModal
        className={`${isMobile ? '!w-[358px]' : '!w-[750px]'}`}
        open={open}
        title="Leader Board"
        onCancel={onCancel}>
        <div className={`${isMobile ? 'max-h-[50vh] h-[22rem]' : 'h-[40rem]'} text-[#AE694C] flex flex-col`}>
          <div className={`flex flex-col flex-1 overflow-hidden ${isMobile ? 'px-[1rem]' : 'px-[2rem]'}`}>
            <div className={`flex w-full ${isMobile ? 'px-[16px]' : 'px-[40px]'} `}>
              <button
                className={`${tabClassName} ${tab === Tabs.Weekly ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
                onClick={() => setTab(Tabs.Weekly)}>
                {Tabs.Weekly}
              </button>
              <button
                className={`${tabClassName} ${tab === Tabs.PastRecord ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
                onClick={() => setTab(Tabs.PastRecord)}>
                {Tabs.PastRecord}
              </button>
            </div>
            <div
              className={`flex flex-col space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1 ${
                isMobile ? 'p-[8px] mb-[8px]' : 'p-[24px] mb-[24px]'
              }`}>
              {tab === Tabs.Weekly ? <WeeklyTabContent /> : null}
              {tab === Tabs.PastRecord ? <PastRecordContent /> : null}
            </div>
          </div>
          {tab === Tabs.Weekly && <TabContentUser />}
        </div>
      </LeaderBoardModal>
    </>
  );
};

export default Leaderboard;
