import { GameRecordItem } from './components/GameRecordItem';
import { IGameHistoryResult, useGameHistory } from './data/useGameHistory';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowGameRecord } from 'redux/reducer/info';
import GameRecordModal from './components/GameRecordModal';
import { MAX_GAME_RECORD_ITEMS } from 'constants/platform';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAddress } from 'hooks/useAddress';
import CommonTab from 'components/CommonTab';
import { TabsProps } from 'antd';
import NoData from 'components/NoData';

export const GameRecord = () => {
  const open = useSelector((state) => state.info.showGameRecord);
  const isMobile = useIsMobile();
  const [data, setData] = useState<IGameHistoryResult>();
  const { gameHistory } = useGameHistory();

  const address = useAddress();

  const getGameHistory = useCallback(async () => {
    try {
      const res = await gameHistory();
      setData(res);
    } catch (error) {
      console.error(error);
    }
  }, [gameHistory]);

  useEffect(() => {
    if (open) {
      getGameHistory();
    }
  }, [getGameHistory, open]);

  useEffect(() => {
    if (address) {
      getGameHistory();
    }
  }, [address, getGameHistory]);

  const PlayRecordDom = useMemo(() => {
    return (
      <div>
        {data?.gameList?.length === 0 ? (
          <NoData />
        ) : (
          <div className={`h-full overflow-auto h-[500px] [&::-webkit-scrollbar]:hidden`}>
            {data?.gameList.map((i) => (
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
        )}
      </div>
    );
  }, [data, isMobile]);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        id: '1',
        label: 'Play Records',
        children: PlayRecordDom,
      },
      {
        key: '2',
        id: '2',
        label: 'Buy Chance Records',
        children: PlayRecordDom,
      },
    ];
  }, [PlayRecordDom]);

  return (
    <GameRecordModal
      open={open}
      title="Game Records"
      onCancel={() => {
        dispatch(toggleShowGameRecord());
      }}>
      <CommonTab defaultActiveKey="1" items={items} />
    </GameRecordModal>
  );
};
export default GameRecord;
