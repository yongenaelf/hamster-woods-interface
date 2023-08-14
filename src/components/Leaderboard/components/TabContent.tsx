import { useIsMobile } from 'redux/selector/mobile';
import { IRankResult } from '../data/rankResult';
import { LeaderBoardItem } from './LeaderBoardItem';

export const TabContent = ({
  data,
  refreshTime,
  isEmpty,
}: {
  data?: IRankResult;
  refreshTime: string;
  isEmpty?: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full flex-grow rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <div className="flex h-full w-full flex-col rounded-2xl bg-blue-700 p-4 shadow-inner">
        <div className="mb-4 mt-2 flex justify-between">
          <div className={` ${isMobile ? 'text-md' : 'text-3xl'}`}>
            <span className="mr-4 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-paytone text-white text-stroke-black">
              i
            </span>
            <span className="font-roboto text-white opacity-60">Next update: {refreshTime}</span>
          </div>
          <div
            className={`text-right font-roboto leading-none text-white underline opacity-60 ${
              isMobile ? 'text-md' : 'text-3xl'
            }`}>
            Reward
          </div>
        </div>
        {isEmpty ? (
          <div className="flex flex-grow items-center justify-center">
            <div className={`${isMobile ? 'px-2' : 'px-32'}`}>
              <img
                src={require('assets/images/no-record.png').default.src}
                alt="No Record"
                className={`mx-auto ${isMobile ? 'mb-8 w-32' : 'mb-16 w-64'}`}
              />
              <div className={`text-center font-roboto text-[#89A5F5] ${isMobile ? 'text-[1.7rem]' : 'text-[3rem]'}`}>
                Leaderboards will be displayed at the end of the first week of rankings.
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="-mr-8 h-1 flex-grow overflow-y-scroll">
              <div className="h-full overflow-y-auto">
                {data?.rankingList.map((i) => (
                  <LeaderBoardItem key={i.rank} rank={i.rank} address={i.caAddress} beans={i.score} />
                ))}
              </div>
            </div>
            <div className="flex h-24 items-center">
              <div
                className={`ml-4 rounded-3xl bg-white p-1 text-center font-bold text-slate-500 ${
                  isMobile ? 'mr-4 w-16 text-3xl' : 'mr-6 w-24 text-4xl'
                }`}>
                {data?.selfRank.rank || 100 > 99 ? '99+' : data?.selfRank.rank}
              </div>
              <div className={`text-white ${isMobile ? 'text-md mr-2' : 'mr-4 text-3xl'}`}>
                {data?.selfRank.caAddress}
              </div>
              <div className="flex-grow">
                <img className="w-16" src={require('assets/images/me.png').default.src} alt="me" />
              </div>
              <div className={`font-normal leading-none text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {(data?.selfRank.score || 0).toLocaleString()}
              </div>
              <img
                className={isMobile ? 'mx-3 h-8' : 'mx-8 h-16'}
                src={require('assets/images/bean.png').default.src}
                alt="bean"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
