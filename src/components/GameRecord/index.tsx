import { GameRecordItem } from './components/GameRecordItem';
import { useGameHis } from './data/useGameHis';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowGameRecord } from 'redux/reducer/info';
import { MAX_GAME_RECORD_ITEMS } from 'constants/platform';
import GameRecordModal from './components/GameRecordModal';

export const GameRecord = () => {
  const open = useSelector((state) => state.info.showGameRecord);
  const isMobile = useIsMobile();
  const { data } = useGameHis();

  return (
    <GameRecordModal
      open={open}
      title="Game Record"
      onCancel={() => {
        dispatch(toggleShowGameRecord());
      }}>
      {!data || data.gameList.length === 0 ? (
        <div className={`flex flex-grow items-center justify-center`}>
          <div>
            <img
              src={require('assets/images/no-record.png').default.src}
              alt="No Record"
              className={`mx-auto ${isMobile ? 'mb-8 w-32' : 'mb-16 w-64'}`}
            />
            <div className={`text-center ${isMobile ? 'text-[2rem]' : 'text-[4rem]'} text-[#89A5F5]`}>
              No record yet
            </div>
          </div>
        </div>
      ) : (
        <div className={`overflow-auto ${isMobile ? 'p-2' : 'px-4 py-8'}`}>
          {data?.gameList.map((i) => (
            <GameRecordItem data={i} key={i.id} />
          ))}
          <div className="flex items-center py-8">
            <div className={`${isMobile ? 'ml-8' : 'ml-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
            <span className="flex-shrink px-4 text-white text-opacity-40">Recent {data?.gameList.length} records</span>
            <div className={`${isMobile ? 'mr-8' : 'mr-32'} h-px flex-grow bg-white bg-opacity-40`}></div>
          </div>
        </div>
      )}
    </GameRecordModal>
  );
};

export default GameRecord;
