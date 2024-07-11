import { Input } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { useIsMobile } from 'redux/selector/mobile';
import CommonBtn from 'components/CommonBtn';
import CustomModal, { ICustomModalProps } from 'components/CustomModal';
import NeatIcon from 'assets/images/neat.png';
import PlusIcon from 'assets/images/plus.png';
import MinusIcon from 'assets/images/minus.png';
import ArrowIcon from 'assets/images/arrow.png';
import AddIcon from 'assets/images/add.png';
import ELFIcon from 'assets/images/elf.png';
import { isValidNumber } from 'utils/common';
import { useSelector } from 'redux/store';
import { IBalance } from 'types';
import openPage from 'utils/openPage';
import { ZERO, divDecimals, divDecimalsStr, formatAmountUSDShow } from 'utils/calculate';
import { ACORNS_TOKEN } from 'constants/index';
import useGetState from 'redux/state/useGetState';
import CommonDisabledBtn from 'components/CommonDisabledBtn';
import styles from './style.module.css';

export type GetChanceModalPropsType = {
  onConfirm?: (n: number, chancePrice: number) => void;
  acornsInUsd: number;
  elfInUsd: number;
  assetBalance: IBalance[];
};

export default function GetChanceModal({
  title = 'Get More Hopping Chances',
  onCancel,
  closable = true,
  acornsInUsd,
  elfInUsd,
  assetBalance,
  onConfirm,
  ...params
}: ICustomModalProps & GetChanceModalPropsType) {
  const { serverConfigInfo, configInfo } = useSelector((state) => state);
  const isMobile = useIsMobile();
  const [inputVal, setInputVal] = useState(1);
  const [expand, setExpand] = useState(false);
  const { playerInfo } = useGetState();
  const [errMsgTip, setErrMsgTip] = useState('');
  const chancePrice = useMemo(
    () => serverConfigInfo.serverConfigInfo?.chancePrice || 1,
    [serverConfigInfo.serverConfigInfo?.chancePrice],
  );
  const fee = useMemo(
    () => serverConfigInfo.serverConfigInfo?.buyChanceTransactionFee || 0,
    [serverConfigInfo.serverConfigInfo?.buyChanceTransactionFee],
  );
  const acornsToken = useMemo(() => assetBalance?.find((item) => item.symbol === ACORNS_TOKEN.symbol), [assetBalance]);
  const ElfToken = useMemo(() => assetBalance?.find((item) => item.symbol === 'ELF'), [assetBalance]);

  const handleMinus = useCallback(() => {
    if (inputVal < 2) return;
    setInputVal((pre) => pre - 1);
  }, [inputVal]);
  const handlePlus = useCallback(() => {
    if (inputVal >= (playerInfo?.weeklyPurchasedChancesCount ?? 0)) return;
    setInputVal((pre) => pre + 1);
  }, [inputVal, playerInfo?.weeklyPurchasedChancesCount]);
  const handleInput = useCallback((value: string) => {
    if (!value) {
      setInputVal(0);
      return;
    }
    if (isValidNumber(value)) {
      setInputVal(Number(value));
    }
  }, []);

  const handleClose = useCallback(() => {
    setInputVal(1);
    onCancel?.();
  }, [onCancel]);

  useEffect(() => {
    setErrMsgTip('');
  }, [inputVal]);

  const handleCheckPurchase = useCallback(() => {
    if (!inputVal) {
      setErrMsgTip('Please input valid number.');
      return false;
    }

    const acornsToken = assetBalance?.find((item) => item.symbol === ACORNS_TOKEN.symbol);
    if (
      !acornsToken?.balance ||
      ZERO.plus(divDecimals(acornsToken.balance, acornsToken.decimals)).lt(ZERO.plus(inputVal).times(chancePrice))
    ) {
      setErrMsgTip('Acorns is not enough');
      return false;
    }

    if (ZERO.plus(inputVal).gt(ZERO.plus(playerInfo?.weeklyPurchasedChancesCount ?? 0))) {
      setErrMsgTip(
        `Purchase limit exceeded. Please try purchasing no more than ${playerInfo?.weeklyPurchasedChancesCount}.`,
      );
      return false;
    }
    return true;
  }, [assetBalance, chancePrice, inputVal, playerInfo?.weeklyPurchasedChancesCount]);

  const handleConfirm = useCallback(() => {
    if (errMsgTip) return;
    if (!handleCheckPurchase()) return;
    onConfirm?.(inputVal, chancePrice);
  }, [chancePrice, errMsgTip, handleCheckPurchase, inputVal, onConfirm]);

  return (
    <CustomModal
      className={`${isMobile ? '!w-[358px]' : '!w-[750px]'} ${styles.getChanceModal}`}
      onCancel={handleClose}
      title={title}
      closable={closable}
      centered
      destroyOnClose
      {...params}>
      <div className={`${isMobile ? 'max-h-[50vh] px-[16px]' : 'h-[41rem] px-[32px]'} overflow-auto`}>
        <div className={` ${isMobile ? 'space-y-[18px] ' : 'space-y-[28px] '}`}>
          <div className={`flex justify-center items-center flex-wrap  ${isMobile ? 'text-[16px]' : 'text-[20px]'} `}>
            Exchange
            <span className="font-bold flex items-center space-x-[6px] mx-[10px]">
              <span>{((inputVal || 1) * chancePrice)?.toLocaleString()}</span>
              <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
              <span>$ACORNS</span>
            </span>
            for <span className="font-bold mx-[10px]">{inputVal || 1}</span>
            {`hopping ${inputVal > 1 ? 'chances' : 'chance'}`}
          </div>
          <div className="flex items-center justify-center space-x-[16px]">
            <Image
              onClick={handleMinus}
              className={`${inputVal < 2 && 'opacity-30'} ${isMobile ? 'w-[32px] h-[32px]' : 'w-[40px] h-[40px]'}`}
              src={MinusIcon}
              alt="minus"
            />
            <Input
              className={`${
                isMobile ? 'w-[222px] h-[32px]' : 'w-[340px] h-[40px]'
              } text-[24px] rounded-[8px] border-[#A15A1C] hover:border-[#A15A1C] focus:border-[#A15A1C] focus:shadow-none text-[#953D22] text-center font-paytone`}
              value={inputVal}
              onChange={(e) => handleInput(e.target.value)}
              onBlur={handleCheckPurchase}
            />
            <Image
              onClick={handlePlus}
              className={`${inputVal >= (playerInfo?.weeklyPurchasedChancesCount ?? 0) && 'opacity-30'} ${
                isMobile ? 'w-[32px] h-[32px]' : 'w-[40px] h-[40px]'
              }`}
              src={PlusIcon}
              alt="plus"
            />
          </div>
        </div>
        <div className="flex justify-center text-[14px] leading-[22px] text-[#FF4D4D] mt-2">{errMsgTip}</div>
        {isMobile ? (
          <div className="flex flex-col space-y-[16px] items-center justify-between mt-[12px] w-full text-[14px]">
            <div>You pay</div>
            <div className="w-full flex items-center justify-between font-bold">
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
                <span>{`${(inputVal * chancePrice)?.toLocaleString()} ${ACORNS_TOKEN.symbol}`}</span>
              </div>
              <Image src={AddIcon} alt="add" />
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={ELFIcon} alt="elf" />
                <span>{`${fee} ELF`}</span>
                <Image
                  className={`w-[20px] h-[20px] ${expand && 'rotate-180'}`}
                  onClick={() => setExpand(!expand)}
                  src={ArrowIcon}
                  alt="arrow"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-[40px] text-[20px]">
            <div>You pay</div>
            <div className="flex items-center space-x-[8px] text-right font-bold">
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
                <span>{`${(inputVal * chancePrice)?.toLocaleString()} ${ACORNS_TOKEN.symbol}`}</span>
              </div>
              <Image src={AddIcon} alt="add" />
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={ELFIcon} alt="elf" />
                <span>{`${fee} ELF`}</span>
                <Image
                  className={`w-[20px] h-[20px] ${expand && 'rotate-180'}`}
                  onClick={() => setExpand(!expand)}
                  src={ArrowIcon}
                  alt="arrow"
                />
              </div>
            </div>
          </div>
        )}
        {expand && (
          <>
            <div
              className={`flex items-start justify-between mt-[12px] text-[#AE694C] ${
                isMobile ? 'text-[14px] mt-[8px]' : 'text-[16px]'
              }`}>
              <div>Estimated Transaction Fee</div>
              <div className={`text-right flex flex-col ${isMobile ? 'space-y-[8px]' : 'space-y-[12px]'}`}>
                <div className="font-bold">{`${fee} ELF`}</div>
                <div>{`${formatAmountUSDShow(fee * elfInUsd)}`}</div>
              </div>
            </div>
            <div
              className={`flex items-start justify-between mt-[12px] text-[#AE694C] ${
                isMobile ? 'text-[14px] mt-[8px]' : 'text-[16px]'
              }`}>
              <div>Buy Game Chance</div>
              <div className={`text-right flex flex-col  ${isMobile ? 'space-y-[8px]' : 'space-y-[12px]'}`}>
                <div className="font-bold">{`${(inputVal * chancePrice)?.toLocaleString()} ${
                  ACORNS_TOKEN.symbol
                }`}</div>
                <div>{`${formatAmountUSDShow(inputVal * chancePrice * acornsInUsd)}`}</div>
              </div>
            </div>
          </>
        )}
        {assetBalance?.length ? (
          <div
            className={`flex flex-col bg-[#E8D1AE] rounded-[12px] ${
              isMobile ? 'text-[16px] space-y-[8px] p-[8px] mt-[12px]' : 'text-[20px] space-y-[24px] p-[16px] mt-[40px]'
            }`}>
            <div className="flex font-black">Balance</div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-left">{`${acornsToken?.symbol}: ${divDecimalsStr(
                acornsToken?.balance,
                acornsToken?.decimals,
              )}`}</div>
              <div
                onClick={() => {
                  openPage(`${configInfo?.configInfo?.awakenUrl}/ACORNS_ELF_0.3`);
                }}
                className={`${
                  isMobile ? 'px-[8px] py-[6px] text-[12px]' : 'px-[16px] py-[9px] text-[14px]'
                } flex items-center justify-center rounded-[8px] bg-[#A15A1C] font-black text-[#FFFFFF]`}>
                Deposit
              </div>
            </div>
            <div className="flex font-bold">{`${ElfToken?.symbol}: ${divDecimalsStr(
              ElfToken?.balance,
              ElfToken?.decimals,
            )}`}</div>
          </div>
        ) : null}
        {errMsgTip ? (
          <CommonDisabledBtn
            title={'Purchase'}
            onClick={undefined}
            className={`flex justify-center items-center ${
              isMobile
                ? 'text-[20px] leading-[20px] mt-[24px] h-[48px] mb-[16px]'
                : '!text-[32px] !leading-[40px] mt-[40px] !h-[76px] mx-[64px] mb-[32px]'
            }`}
          />
        ) : (
          <CommonBtn
            title={'Purchase'}
            onClick={handleConfirm}
            className={`flex justify-center items-center font-paytone ${
              isMobile
                ? 'text-[20px] leading-[20px] mt-[24px] h-[48px] mb-[16px]'
                : '!text-[32px] !leading-[40px] mt-[40px] !h-[76px] mx-[64px] mb-[32px]'
            }`}
          />
        )}
      </div>
    </CustomModal>
  );
}
