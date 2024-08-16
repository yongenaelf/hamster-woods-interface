import { Item, TaskItem } from './TaskItem';
import { MAX_LEADERBOARD_EMPTY } from 'constants/platform';
import styles from './style.module.css';
import { useIsMobile } from 'redux/selector/mobile';
import { divDecimalsStr } from 'utils/calculate';
import { useRef } from 'react';

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

export type IData = {
  title: string;
  list: Item[];
  id: any;
};
export interface ITaskItemList {
  data?: IData[];
  onItemClick?: (item: Item) => void;
}

export const TaskItemList = ({ data, onItemClick }: ITaskItemList) => {
  const isMobile = useIsMobile();
  const listRef = useRef(null);

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={`flex flex-grow w-full flex-col`}>
      <div className="h-[4px] flex-grow overflow-y-hidden">
        <div className={`${styles.scrollbar} h-full overflow-y-auto`} ref={listRef}>
          {data?.map((item) => {
            return (
              <div key={item.id}>
                <div
                  className={`${
                    isMobile ? 'text-[14px] leading-[18px] mt-[16px]' : 'text-[20px] leading-[24px] mt-[24px]'
                  } flex font-bold font-roboto mb-[8px]   text-[#953D22]`}>
                  {item.title ?? '--'}
                </div>
                {item?.list.map((innerItem) => (
                  <TaskItem
                    key={innerItem.id}
                    item={innerItem}
                    onItemClick={(item) => {
                      onItemClick?.(item);
                      scrollToTop();
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
