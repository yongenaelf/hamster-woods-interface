import { useState, Fragment } from 'react';
import { WeeklyTabContent } from './components/WeeklyTabContent';
import { SeasonTabContent } from './components/SeasonTabContent';
import { Modal } from 'components/Modal';
import { PastRecordContent } from './components/PastRecordContent';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowLeaderboard } from 'redux/reducer/info';

enum Tabs {
  Weekly = 'Weekly',
  Season = 'Season',
  PastRecord = 'Past Record',
}

const _tabClassName =
  'w-1/3 rounded-tl-lg rounded-tr-lg shadow-inner text-white flex items-center justify-center font-fonarto font-bold p-2';

export const Leaderboard = () => {
  const open = useSelector((state) => state.info.showLeaderboard);
  const [tab, setTab] = useState<Tabs>(Tabs.Weekly);
  const isMobile = useIsMobile();

  const tabClassName = `${_tabClassName} ${isMobile ? 'text-md' : 'text-xl'}`;

  return (
    <Fragment>
      <Modal isOpen={open} title="Leader Board" onClose={() => dispatch(toggleShowLeaderboard())}>
        <div className={`${isMobile ? 'mx-4' : 'mx-10'} flex`}>
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
      </Modal>
    </Fragment>
  );
};

export default Leaderboard;
