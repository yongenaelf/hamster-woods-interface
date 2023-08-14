import { useIsMobile } from 'redux/selector/mobile';
import { IRankResult } from '../data/rankResult';
import { LeaderBoardItem } from './LeaderBoardItem';

// flex h-full w-full flex-col rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 shadow-inner

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
    <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
      <div
        className={`mt-2 rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 pb-0 shadow-inner ${
          isMobile ? 'text-md' : 'text-3xl'
        }`}>
        <span className="mr-4 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-paytone text-white text-stroke-black">
          i
        </span>
        <span className="font-roboto text-white opacity-60">Next update: {refreshTime}</span>
      </div>
      {isEmpty ? (
        <div className="flex flex-grow items-center justify-center bg-blue-700">
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
          <div className="flex h-full w-full flex-col bg-blue-700 p-4 shadow-inner">
            <div className="-mr-8 h-1 flex-grow overflow-y-scroll">
              <div className="h-full overflow-y-auto">
                {data?.rankingList.map((i) => (
                  <LeaderBoardItem
                    key={i.rank}
                    rank={i.rank}
                    address={i.caAddress}
                    beans={i.score}
                    isCurrentUserRank={i.rank === data.selfRank.rank}
                  />
                ))}
              </div>
            </div>
          </div>
          {(data?.selfRank.rank || 1) > 99 ? (
            <div className="flex h-24 items-center rounded-bl-2xl rounded-br-2xl bg-blue-700 pl-3 pr-4">
              <div
                className={`ml-4 rounded-3xl bg-white p-1 text-center font-bold text-slate-500 ${
                  isMobile ? 'mr-4 w-16 text-3xl' : 'mr-6 w-24 text-4xl'
                }`}>
                99+
              </div>
              <div className={`font-bold text-white ${isMobile ? 'text-md mr-2' : 'mr-4 text-3xl'}`}>
                {data?.selfRank.caAddress}
              </div>
              <div className="flex-grow">
                <img className="w-16" src={require('assets/images/me.png').default.src} alt="me" />
              </div>
              <div className={`font-bold text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {(data?.selfRank.score || 0).toLocaleString()}
              </div>
              <img
                className={isMobile ? 'mx-3 h-8' : 'mx-8 h-16'}
                src={require('assets/images/bean.png').default.src}
                alt="bean"
              />
            </div>
          ) : (
            <div className="flex h-24 items-center rounded-bl-2xl rounded-br-2xl bg-gradient-to-b from-[#FFD304] to-[#FFF4C1] pl-3 pr-4">
              <div
                className={`ml-4 rounded-3xl bg-white p-1 text-center font-bold text-[#0538C9] ${
                  isMobile ? 'mr-4 w-16 text-3xl' : 'mr-6 w-24 text-4xl'
                }`}>
                {data?.selfRank.rank}
              </div>
              <div className={`font-bold text-[#0538C9] ${isMobile ? 'text-md mr-2' : 'mr-4 text-3xl'}`}>
                {data?.selfRank.caAddress}
              </div>
              <div className="flex-grow"></div>
              <div className={`font-bold text-[#0538C9] ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
                {(data?.selfRank.score || 0).toLocaleString()}
              </div>
              <img
                className={isMobile ? 'mx-3 h-8' : 'mx-8 h-16'}
                src={require('assets/images/bean.png').default.src}
                alt="bean"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
