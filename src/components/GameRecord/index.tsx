import { Fragment } from 'react';
import { Modal } from 'components/Modal';
import { GameRecordItem } from './components/GameRecordItem';
import { useGameHis } from './data/useGameHis';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowGameRecord } from 'redux/reducer/info';

export const GameRecord = () => {
  const open = useSelector((state) => state.info.showGameRecord);
  const isMobile = useIsMobile();
  const { data } = useGameHis();

  return (
    <Fragment>
      <Modal isOpen={open} title="Game Record" onClose={() => dispatch(toggleShowGameRecord())}>
        {data?.gameList?.length ? (
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
          <div className={`overflow-auto ${isMobile ? 'p-2' : 'px-16 py-8'}`}>
            {data?.gameList.map((i) => (
              <GameRecordItem data={i} key={i.id} />
            ))}
            <div className="flex items-center py-8">
              <div className="flex-grow h-px bg-white bg-opacity-40 ml-32"></div>
              <span className="flex-shrink text-white text-opacity-40 px-4">Recent 150 records</span>
              <div className="flex-grow h-px bg-white bg-opacity-40 mr-32"></div>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default GameRecord;
