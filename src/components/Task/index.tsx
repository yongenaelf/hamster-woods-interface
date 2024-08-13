import { useState } from 'react';

import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowTaskModal } from 'redux/reducer/info';
import TaskModal from './components/TaskModal';
import { TaskTabContent } from './components/TaskTabContent';
import { FluxPointsTabContent } from './components/FluxPointsTabContent';

enum Tabs {
  Tasks = 'Tasks',
  FluxPoints = 'Flux Points',
}

const _tabClassName =
  'w-1/2 rounded-tl-lg h-auto rounded-tr-lg shadow-inner text-[#953D22] flex items-center justify-center font-paytone font-bold';

export const Task = () => {
  const open = useSelector((state) => state?.info?.showTaskModal);
  const [tab, setTab] = useState<Tabs>(Tabs.Tasks);
  const isMobile = useIsMobile();

  const tabClassName = `${_tabClassName} ${
    isMobile ? 'text-[14px] leading-[16px] py-[8px]' : 'text-[20px] leading-[24px] py-[11px]'
  }`;
  const onCancel = () => {
    dispatch(toggleShowTaskModal());
  };

  return (
    <>
      <TaskModal
        className={`${isMobile ? '!w-[358px]' : '!w-[750px]'}`}
        open={open}
        title="Tasks & Flux Points"
        onCancel={onCancel}>
        <div className={`${isMobile ? 'max-h-[50vh] h-[22rem]' : 'h-[40rem]'} text-[#AE694C] flex flex-col`}>
          <div className={`flex flex-col flex-1 overflow-hidden ${isMobile ? 'px-[1rem]' : 'px-[2rem]'}`}>
            <div className={`flex w-full ${isMobile ? 'px-[16px]' : 'px-[40px]'} `}>
              <button
                className={`${tabClassName} ${tab === Tabs.Tasks ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
                onClick={() => setTab(Tabs.Tasks)}>
                {Tabs.Tasks}
              </button>
              <button
                className={`${tabClassName} ${tab === Tabs.FluxPoints ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
                onClick={() => setTab(Tabs.FluxPoints)}>
                {Tabs.FluxPoints}
              </button>
            </div>
            <div
              className={`flex flex-col space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1 ${
                isMobile ? 'p-[8px] mb-[8px]' : 'p-[24px] mb-[24px]'
              }`}>
              {tab === Tabs.Tasks ? <TaskTabContent /> : null}
              {tab === Tabs.FluxPoints ? <FluxPointsTabContent /> : null}
            </div>
          </div>
        </div>
      </TaskModal>
    </>
  );
};

export default Task;
