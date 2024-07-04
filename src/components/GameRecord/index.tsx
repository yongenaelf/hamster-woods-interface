import { BuyRecordItem, GameRecordItem } from './components/GameRecordItem';
import { IBuyHistoryResult, IGameHistoryResult, useBuyHistory, useGameHistory } from './data/useGameHistory';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowGameRecord } from 'redux/reducer/info';
import GameRecordModal from './components/GameRecordModal';
import { MAX_GAME_RECORD_ITEMS } from 'constants/platform';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAddress } from 'hooks/useAddress';
import NoData from 'components/NoData';

enum Tabs {
  PlayRecords = 'Play Records',
  BuyChanceRecords = 'Buy Chance Records',
}

const _tabClassName =
  'w-1/2 rounded-tl-lg h-auto rounded-tr-lg shadow-inner text-[#953D22] flex items-center justify-center font-fonarto font-bold';

export const GameRecord = () => {
  const open = useSelector((state) => state.info.showGameRecord);
  const isMobile = useIsMobile();
  const [tab, setTab] = useState<Tabs>(Tabs.PlayRecords);

  const [gameHistoryData, setGameHistoryData] = useState<IGameHistoryResult>();
  const [buyHistoryData, setBuyHistoryData] = useState<IBuyHistoryResult>();

  const tabClassName = `${_tabClassName} ${
    isMobile ? 'text-[14px] leading-[16px] py-[8px]' : 'text-[20px] leading-[24px] py-[11px]'
  }`;

  const { gameHistory } = useGameHistory();
  const { buyHistory } = useBuyHistory();

  const address = useAddress();

  const getGameHistory = useCallback(async () => {
    try {
      const res = await gameHistory();
      setGameHistoryData(res);
    } catch (error) {
      console.error(error);
    }
  }, [gameHistory]);

  const getBuyHistory = useCallback(async () => {
    try {
      const res = await buyHistory();
      setBuyHistoryData(res);
    } catch (error) {
      console.error(error);
    }
  }, [buyHistory]);

  useEffect(() => {
    if (open) {
      getGameHistory();
      getBuyHistory();
    }
  }, [getBuyHistory, getGameHistory, open]);

  useEffect(() => {
    if (address) {
      getGameHistory();
    }
  }, [address, getGameHistory]);

  const PlayRecordDom = useMemo(() => {
    return (
      <div className="flex w-full flex-grow flex-col m-0">
        {gameHistoryData?.gameList?.length ? (
          <div>
            {gameHistoryData?.gameList.map((i) => (
              <GameRecordItem data={i} key={i.id} />
            ))}
            <div className="flex items-center py-8">
              <div className={`${isMobile ? 'ml-8' : 'ml-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
              <span className="flex-shrink px-4 text-white text-opacity-40">
                Recent {MAX_GAME_RECORD_ITEMS} records
              </span>
              <div className={`${isMobile ? 'mr-8' : 'mr-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
            </div>
          </div>
        ) : (
          <NoData tips="No record yet" />
        )}
      </div>
    );
  }, [gameHistoryData?.gameList, isMobile]);

  const BuyRecordDom = useMemo(() => {
    return (
      <div className="flex w-full flex-grow flex-col m-0">
        {buyHistoryData?.buyChanceList?.length ? (
          <div className={`h-full overflow-auto h-[500px] [&::-webkit-scrollbar]:hidden`}>
            {buyHistoryData?.buyChanceList.map((i) => (
              <BuyRecordItem data={i} key={i.id} />
            ))}
            <div className="flex items-center py-8">
              <div className={`${isMobile ? 'ml-8' : 'ml-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
              <span className="flex-shrink px-4 text-white text-opacity-40">
                Recent {MAX_GAME_RECORD_ITEMS} records
              </span>
              <div className={`${isMobile ? 'mr-8' : 'mr-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
            </div>
          </div>
        ) : (
          <NoData tips="No record yet" />
        )}
      </div>
    );
  }, [buyHistoryData?.buyChanceList, isMobile]);

  return (
    <GameRecordModal
      className={`${isMobile ? '!w-[358px]' : '!w-[750px]'}`}
      open={open}
      title="Game Records"
      onCancel={() => {
        dispatch(toggleShowGameRecord());
      }}>
      <div className={`${isMobile ? 'h-[33rem]' : 'h-[38rem]'} text-[#AE694C]`}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className={`${isMobile ? 'px-[16px]' : 'px-[40px]'} flex w-full`}>
            <button
              className={`${tabClassName} ${tab === Tabs.PlayRecords ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
              onClick={() => setTab(Tabs.PlayRecords)}>
              {Tabs.PlayRecords}
            </button>
            <button
              className={`${tabClassName} ${tab === Tabs.BuyChanceRecords ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
              onClick={() => setTab(Tabs.BuyChanceRecords)}>
              {Tabs.BuyChanceRecords}
            </button>
          </div>
          <div
            className={`flex flex-col space-x-[8px] rounded-[8px] flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden ${
              isMobile ? 'mb-[8px]' : 'mb-[24px]'
            }`}>
            {tab === Tabs.PlayRecords ? PlayRecordDom : null}
            {tab === Tabs.BuyChanceRecords ? BuyRecordDom : null}
          </div>
        </div>
      </div>
    </GameRecordModal>
  );
};
export default GameRecord;
