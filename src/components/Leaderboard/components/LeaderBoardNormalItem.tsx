import { useIsMobile } from 'redux/selector/mobile';
import { middleEllipsis } from 'utils/middleEllipsis';
import { LeaderboardTextColors } from '../data/constant';

export const LeaderBoardNormalItem = ({
  rank = 4,
  address = '-',
  beans = 0,
  isCurrentUserRank,
}: {
  rank: number;
  address: string;
  beans: number;
  isCurrentUserRank?: boolean;
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex w-full items-center justify-between rounded-full p-1 h-10 bg-[#DEC49D] ${
        isMobile ? 'mb-2' : 'mb-3'
      }`}>
      <div className="basis-2 flex items-center">
        <div
          className={`${
            isMobile ? '!w-[32px] mr-2' : '!w-[40px] mr-3'
          } shrink-0 flex items-center justify-center ml-2 text-white text-[16px] font-fonarto bg-[#B26C27] rounded-full`}>
          {rank}
        </div>
        <div className={`font-bold ${isMobile ? 'text-xs' : 'text-[16px]'} ${LeaderboardTextColors.Brown}`}>
          {middleEllipsis(address)}
        </div>
        {isCurrentUserRank ? (
          <img
            width={32}
            height={16}
            className={`z-10 ml-2`}
            src={require('assets/images/me.png').default.src}
            alt="me"
          />
        ) : null}
      </div>
      <div className="basis-2 flex justify-end items-center text-right ">
        <div className={`${isMobile ? 'text-[14px]' : 'text-[20px]'} font-fonarto text-[#AE694C] `}>
          {beans?.toLocaleString() ?? '-'}
        </div>
        <img
          width={20}
          height={20}
          className="ml-[5px] mr-4 w-[20px] h-[20px]"
          src={require('assets/images/neat.png').default.src}
          alt="bean"
        />
      </div>
    </div>
  );
};
