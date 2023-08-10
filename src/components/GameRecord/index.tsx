import { useState, Fragment } from 'react';
import { Modal } from 'components/Modal';
import { GameRecordItem } from './components/GameRecordItem';
import { useGameHis } from './data/useGameHis';

export const GameRecord = () => {
  const [open, setOpen] = useState(true);
  const { data } = useGameHis('test');

  return (
    <Fragment>
      <button className="text-white" onClick={() => setOpen(true)}>
        Game Record
      </button>
      <Modal isOpen={open} title="Game Record" onClose={() => setOpen(false)}>
        {!data || data.GameList.length === 0 ? (
          <div className="flex h-full flex-col justify-center text-center text-white">
            <div>No record yet</div>
          </div>
        ) : (
          <div className="overflow-auto">
            {data?.GameList.map((i, key) => (
              <GameRecordItem data={i} key={key} />
            ))}
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default GameRecord;
