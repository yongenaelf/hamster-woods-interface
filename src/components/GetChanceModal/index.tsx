import { Input, ModalProps } from 'antd';
import { MouseEvent, useCallback, useState } from 'react';
import Image from 'next/image';

import { useIsMobile } from 'redux/selector/mobile';
import CommonBtn from 'components/CommonBtn';
import CustomModal from 'components/CustomModal';
import NeatIcon from 'assets/images/neat.png';
import PlusIcon from 'assets/images/plus.png';
import MinusIcon from 'assets/images/minus.png';
import ArrowIcon from 'assets/images/Arrow.png';
import AddIcon from 'assets/images/add.png';
import ELFIcon from 'assets/images/elf.png';
import { isValidNumber } from 'utils/common';

export type GetChanceModalPropsType = {
  onConfirm?: (e: MouseEvent<any>) => void;
  onCancel: (e: MouseEvent<any>) => void;
  open: boolean;
};

export default function GetChanceModal({
  title = 'Get More Hopping Chances',
  onCancel,
  closable = true,
  ...params
}: ModalProps & GetChanceModalPropsType) {
  const isMobile = useIsMobile();
  const [inputVal, setInputVal] = useState(1);
  const [expand, setExpand] = useState(false);

  const handleMinus = useCallback(() => {
    if (inputVal < 2) return;
    setInputVal((pre) => pre - 1);
  }, [inputVal]);
  const handleInput = useCallback((value: string) => {
    if (!value) {
      setInputVal(0);
      return;
    }
    if (isValidNumber(value)) {
      setInputVal(Number(value));
    }
  }, []);

  return (
    <CustomModal
      className={`${isMobile ? '!w-[358px]' : '!w-[750px]'}`}
      onCancel={onCancel}
      title={title}
      closable={closable}
      {...params}>
      <div className={`overflow-auto`}>
        <div className="space-y-[28px]">
          <div className="flex justify-center items-center flex-wrap">
            Do you want to pay
            <span className="font-bold flex items-center space-x-[6px] mx-[10px]">
              <span>15</span>
              <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
              <span>ACORNS</span>
            </span>
            for <span className="font-bold mx-[10px]">1 number</span>of chances to play
          </div>
          <div className="flex items-center justify-center space-x-[16px]">
            <Image
              onClick={handleMinus}
              className={`${inputVal < 2 && 'opacity-30'} w-[40px] h-[40px]`}
              src={MinusIcon}
              alt="minus"
            />
            <Input
              className={`${
                isMobile ? 'w-[222px]' : 'w-[340px]'
              } h-[40px] rounded-[8px] border-[#A15A1C] hover:border-[#A15A1C] focus:border-[#A15A1C] focus:shadow-none text-[#953D22] text-center font-fonarto`}
              value={inputVal}
              onChange={(e) => handleInput(e.target.value)}
            />
            <Image
              onClick={() => setInputVal((pre) => pre + 1)}
              className="w-[40px] h-[40px]"
              src={PlusIcon}
              alt="plus"
            />
          </div>
        </div>
        {isMobile ? (
          <div className="flex flex-col space-y-[16px] items-center justify-between mt-[24px] w-full">
            <div className="text-[14px]">You pay</div>
            <div className="w-full flex items-center justify-between font-bold">
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
                <span className="text-[14px]">1500 ACORNS</span>
              </div>
              <Image src={AddIcon} alt="add" />
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={ELFIcon} alt="elf" />
                <span className="text-[14px]">0.001 ELF</span>
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
          <div className="flex items-center justify-between mt-[40px]">
            <div>You pay</div>
            <div className="flex items-center space-x-[8px] text-right font-bold">
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={NeatIcon} alt="neat" />
                <span>1500 ACORNS</span>
              </div>
              <Image src={AddIcon} alt="add" />
              <div className="flex items-center space-x-[8px]">
                <Image className="w-[20px] h-[20px]" src={ELFIcon} alt="elf" />
                <span>0.001 ELF</span>
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
            <div className="flex items-start justify-between mt-[12px] text-[#AE694C] text-[16px]">
              <div>Estimated Transaction Fee</div>
              <div className="text-right flex flex-col space-y-[12px]">
                <div className="font-bold">999,999 ELF</div>
                <div>$ 999</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-[12px] text-[#AE694C] text-[16px]">
              <div>Buy Game Chance</div>
              <div className="text-right flex flex-col space-y-[12px]">
                <div className="font-bold">999,999 ELF</div>
                <div>$ 999</div>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col space-y-[24px] p-[16px] bg-[#E8D1AE] rounded-[12px] mt-[40px]">
          <div className="flex font-black text-[20px]">balance</div>
          <div className="flex justify-between items-center">
            <div className="font-bold text-left">ACORNS: 123,456,789,123,456.1234</div>
            <div className="flex items-center justify-center px-[16px] py-[9px] rounded-[8px] bg-[#A15A1C] text-[14px] font-black text-[#FFFFFF]">
              Deposit
            </div>
          </div>
          <div className="flex font-bold">ELF: 123,456,789.1234</div>
        </div>
        <CommonBtn title="Purchase" className="mt-[40px] mb-[4px] mx-[64px] h-[70px]" />
      </div>
    </CustomModal>
  );
}
