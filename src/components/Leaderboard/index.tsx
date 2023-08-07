import { useState, Fragment } from 'react';
import { WeeklyTabContent } from './components/WeeklyTabContent';
import { SeasonTabContent } from './components/SeasonTabContent';
import { Modal } from 'components/Modal';
import { PastRecordContent } from './components/PastRecordContent';
import { useIsMobile } from 'redux/selector/mobile';

const _tabClassName =
  'w-1/3 rounded-tl-lg rounded-tr-lg shadow-inner text-white flex items-center justify-center text-stroke-black font-paytone';

export const Leaderboard = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const isMobile = useIsMobile();

  const tabClassName = [_tabClassName, isMobile ? 'text-md p-2' : 'text-4xl p-4'].join(' ');

  return (
    <Fragment>
      <button className="fixed top-32 right-0" onClick={() => setOpen(true)}>
        <img
          className={isMobile ? 'w-32' : 'w-64'}
          src={require('./images/leaderboard-icon.png').default.src}
          alt="open Leaderboard"
        />
      </button>
      <Modal isOpen={open} title="Leader Board" onClose={() => setOpen(false)}>
        <div className="flex mx-10">
          <button
            className={[tabClassName, tab === 0 ? 'bg-blue-400' : 'bg-blue-700'].join(' ')}
            onClick={() => setTab(0)}>
            Weekly
          </button>
          <button
            className={[tabClassName, tab === 1 ? 'bg-blue-400' : 'bg-blue-700'].join(' ')}
            onClick={() => setTab(1)}>
            Season
          </button>
          <button
            className={[tabClassName, tab === 2 ? 'bg-blue-400' : 'bg-blue-700'].join(' ')}
            onClick={() => setTab(2)}>
            Past Record
          </button>
        </div>
        {tab === 0 ? <WeeklyTabContent /> : null}
        {tab === 1 ? <SeasonTabContent /> : null}
        {tab === 2 ? <PastRecordContent /> : null}
      </Modal>
    </Fragment>
  );
};

export default Leaderboard;
