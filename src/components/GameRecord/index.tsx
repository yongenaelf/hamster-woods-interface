import { useState, Fragment } from 'react';
import { Modal } from 'components/Modal';
import { GameRecordItem } from './components/GameRecordItem';
import { useGameHis } from './data/useGameHis';
import { useIsMobile } from 'redux/selector/mobile';

export const GameRecord = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data } = useGameHis('21mEqQqL1L79QDcryCCbFPv9nYjj7SCefsBrXMMkajE7iFmgkD');

  return (
    <Fragment>
      <button className="text-white" onClick={() => setOpen(true)}>
        Game Record
      </button>
      <Modal isOpen={open} title="Game Record" onClose={() => setOpen(false)}>
        {!data || data.gameList.length === 0 ? (
          <div className={`flex flex-grow items-center justify-center`}>
            <div>
              <img
                src={require('assets/images/no-record.png').default.src}
                alt="No Record"
                className={`mx-auto ${isMobile ? 'mb-8 w-32' : 'mb-16 w-64'}`}
              />
              <div className={`text-center font-roboto ${isMobile ? 'text-[2rem]' : 'text-[4rem]'} text-[#89A5F5]`}>
                No record yet
              </div>
            </div>
          </div>
        ) : (
          <div className={`overflow-auto ${isMobile ? 'p-2' : 'px-16 py-8'}`}>
            {data?.gameList.map((i, key) => (
              <GameRecordItem data={i} key={key} />
            ))}
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default GameRecord;
