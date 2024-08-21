import { toggleShowTaskModal } from 'redux/reducer/info';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch } from 'redux/store';

export enum TaskType {
  Daily_Hop = 1,
  Weekly_Purchase = 2,
}
export type Item = {
  id: number;
  type: TaskType;
  icon?: string;
  title: string;
  pointAmount: number;
  pointName: string;
  isComplete: boolean;
};

export const TaskItem = ({ item, onItemClick }: { item: Item; onItemClick?: (item: Item) => void }) => {
  const isMobile = useIsMobile();
  const handleGoClick = () => {
    dispatch(toggleShowTaskModal());
    onItemClick?.(item);
  };
  if (!item) {
    return null;
  }
  if (isMobile) {
    return (
      <div className="w-full h-auto px-3 mb-[8px] py-[10px] bg-[#DEC49D] rounded-[12px] flex-col justify-center items-start gap-1 inline-flex">
        <div className="self-stretch flex justify-start items-center gap-2 inline-flex">
          {/* <div className="w-4 h-4 relative bg-black rounded-[13.33px] overflow-hidden">
            <div className="w-2 h-[7.49px] absolute left-1 top-[4.26px] bg-white border border-white"></div>
          </div> */}
          {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
          <img className="w-4 h-4 overflow-hidden" src={item.icon} />
          <div className="flex-1 text-[#953D22] text-[12px] font-roboto font-bold leading-[18px] break-words">
            {item.title ?? '--'}
          </div>
        </div>
        <div className="self-stretch flex justify-start items-center gap-2 inline-flex">
          <div className="flex-1 h-[18px] flex justify-center items-center gap-1">
            <div className="w-4 h-4 px-[0.94px] py-[0.03px] flex justify-center items-center">
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img className="w-[14.13px] h-[15.95px]" src={require('assets/images/point.png').default.src} />
            </div>
            <div className="flex-1 text-[#953D22] text-[12px] font-roboto font-bold leading-[18px] break-words">
              {item.type === TaskType.Weekly_Purchase ? '+' : ''}
              {item.pointAmount ?? '0'} {item.pointName ?? '--'}
            </div>
          </div>
          {/* </div> */}
          <div className="w-14 h-6 flex justify-center items-center">
            {item.isComplete ? (
              // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
              <img className="w-[22px] h-[22px]" src={require('assets/images/button-task-ok.png').default.src} />
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
              <img className="w-[48px] h-[22px]" src={require('assets/images/button-task-go.png').default.src} />
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-auto px-3 py-[10px] bg-[#DEC49D] rounded-[12px] inline-flex justify-start items-center gap-2 mb-[8px]">
      <div className="flex-1 h-6 flex justify-start items-center gap-2">
        {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
        <img className="w-6 h-6" src={item.icon} />
        <div className="flex-1 text-[#953D22] text-[14px] font-roboto font-bold leading-[16px] break-words">
          {item.title ?? '--'}
        </div>
      </div>
      <div className="w-[224px] h-6 flex justify-start items-center gap-1">
        <div className="w-6 h-6 px-[1.4px] py-[0.04px] flex justify-center items-center">
          {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
          <img className="w-[21.19px] h-[23.92px]" src={require('assets/images/point.png').default.src} />
        </div>
        <div className="text-[#953D22] text-[14px] font-roboto font-bold leading-[16px] break-words">
          {item.pointAmount ?? '0'} {item.pointName ?? '--'}
        </div>
      </div>
      <div className="w-14 h-6 flex justify-center items-center">
        {item.isComplete ? (
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          <img className="w-[26px] h-[26px] " src={require('assets/images/button-task-ok.png').default.src} />
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          <img className="w-[56px] h-[26px]" src={require('assets/images/button-task-go.png').default.src} />
        )}
      </div>
    </div>
  );
};
