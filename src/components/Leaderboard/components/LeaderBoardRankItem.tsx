import { useIsMobile } from 'redux/selector/mobile';
import { middleEllipsis } from 'utils/middleEllipsis';
import { LeaderboardTextColors } from '../data/constant';

export const LeaderBoardRankItem = ({
  src,
  bgClassName,
  textClassName,
  shadowInsetColor,
  address = '-',
  beans = 0,
  isCurrentUserRank,
}: {
  src: string;
  bgClassName: string;
  textClassName: LeaderboardTextColors;
  shadowInsetColor: string;
  address: string;
  beans: number;
  isCurrentUserRank?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative flex w-full items-center justify-between rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute before:bg-white before:bg-opacity-30 ${
        isMobile
          ? 'h-12 mb-2 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-12 mb-3 before:h-8 before:left-1 before:right-1 before:top-1 before:rounded-2xl'
      } ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <div className="basis-2 flex items-center">
        <img
          width={40}
          height={40}
          className={`w-[40px] h-[40px] z-10 h-full ${isMobile ? '' : 'mx-2'}`}
          src={src}
          alt="rank"
        />
        <div className={`${isMobile ? 'text-[12px]' : 'text-[20px]'} ${LeaderboardTextColors.White} font-fonarto`}>
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
        <div className={`${isMobile ? 'text-[16px]' : 'text-[20px]'} font-fonarto ${textClassName}`}>
          {beans?.toLocaleString() ?? '-'}
        </div>
        <img width={20} className="z-10 ml-[5px] mr-4" src={require('assets/images/neat.png').default.src} alt="neat" />
      </div>
    </div>
  );
};
