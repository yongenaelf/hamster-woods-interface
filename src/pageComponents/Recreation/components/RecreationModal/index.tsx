import { Modal } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import LightTreasure from 'assets/images/recreation/treasure-box-light.svg';

import styles from './index.module.css';
import useGetState from 'redux/state/useGetState';

export enum RecreationModalType {
  DICE = 'dice',
  TREASURE = 'treasure',
}

export enum TreasureStatus {
  CLOSE = 'close',
  OPENING = 'Opening',
  OPENED = 'Opened',
}

interface IRecreationModal {
  open: boolean;
  step?: number;
  bean?: number;
  type: RecreationModalType;
  onClose?: () => void;
}

function RecreationModal(props: IRecreationModal) {
  const { open, step, bean, type, onClose } = props;

  const { isMobile, imageResources } = useGetState();
  const [treasureStatus, setTreasureStatus] = useState<TreasureStatus>(TreasureStatus.OPENED);
  const [openable, setOpenable] = useState<boolean>(true);

  const dice: Record<string, string> = {
    1: imageResources!.dice1,
    2: imageResources!.dice2,
    3: imageResources!.dice3,
    4: imageResources!.dice4,
    5: imageResources!.dice5,
    6: imageResources!.dice6,
  };

  const openTreasure = () => {
    if (openable) {
      setTreasureStatus(TreasureStatus.OPENING);
      setOpenable(false);
      const timerOpen = setTimeout(() => {
        setTreasureStatus(TreasureStatus.OPENED);
        clearTimeout(timerOpen);
      }, 1600);
    }
  };

  useEffect(() => {
    if (!open) {
      setTreasureStatus(TreasureStatus.CLOSE);
      setOpenable(true);
    }
  }, [open]);

  const TreasureCom: Record<TreasureStatus, ReactElement> = {
    [TreasureStatus.CLOSE]: (
      <img
        src={imageResources!.treasureBox}
        className={`${isMobile ? 'mb-[40px] h-auto w-[67%]' : 'mb-[53px] h-auto w-[377px]'}`}
        alt="treasureBox"
      />
    ),
    [TreasureStatus.OPENING]: (
      <img
        src={imageResources!.treasureBoxOpening}
        className={`${isMobile ? 'mt-[-70px] h-auto w-[80%]' : 'mt-[-100px] h-auto w-[520px]'}`}
        alt="treasure"
      />
    ),
    [TreasureStatus.OPENED]: (
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute left-0 right-0 top-[-60%] z-[40] m-auto ${
            isMobile ? 'h-auto w-[67%]' : 'h-auto w-[377px]'
          }`}>
          <LightTreasure className="relative z-[20] h-full w-full" />
          <span
            className={`absolute bottom-0 left-0 right-0 top-0 z-[30] m-auto flex items-center justify-center text-[#fff] ${
              isMobile ? 'text-[64px]' : 'text-[96px]'
            }`}>
            +{bean}
          </span>
        </div>
        <img
          src={imageResources?.treasureBoxOpened}
          className={`relative z-[50] ${isMobile ? 'mb-[10px] h-auto w-[67%]' : 'mb-[53px] h-auto w-[377px]'}`}
          alt=""
        />
      </div>
    ),
  };

  const modalContent: Record<RecreationModalType, ReactElement | null> = {
    [RecreationModalType.DICE]: dice[`${step}`] ? (
      <div className="flex items-center justify-center">
        <img src={dice[`${step}`]} className={`${isMobile ? 'h-auto w-full' : 'h-auto w-[100%]'}`} alt="dice1" />
      </div>
    ) : null,
    [RecreationModalType.TREASURE]: (
      <div className="relative z-[80] flex h-auto w-full flex-col items-center justify-center">
        {TreasureCom[treasureStatus]}
        <span
          className={`font-fonarto ${styles['treasure-btn']} ${
            isMobile ? styles['treasure-btn-mobile'] : styles['treasure-btn-pc']
          }`}
          onClick={treasureStatus === TreasureStatus.OPENED ? onClose : openTreasure}>
          {treasureStatus === TreasureStatus.OPENED ? 'Confirm' : 'OPEN'}
        </span>
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      footer={null}
      keyboard={false}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      className={styles['recreation-modal']}>
      {open && modalContent[type]}
    </Modal>
  );
}

export default React.memo(RecreationModal);
