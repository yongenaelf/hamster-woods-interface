import { ModalProps } from 'antd';
import CustomModal, { ICustomModalProps } from 'components/CustomModal';
import { useCallback, useMemo, useState } from 'react';
import { useIsMobile } from 'redux/selector/mobile';
import { useLockInfos, useUnlockRecords } from './hook';
import { divDecimalsStr } from 'utils/calculate';

export enum LockedAcornsTabEnum {
  Pending = 'Locked',
  Unlock = 'Unlocked',
}
const _tabClassName =
  'w-1/2 rounded-tl-lg h-auto rounded-tr-lg shadow-inner text-[#953D22] flex items-center justify-center font-fonarto font-bold';

export default function LockedAcornsModal({ open, onCancel, ...props }: ICustomModalProps) {
  const isMobile = useIsMobile();
  const { data: lockInfos } = useLockInfos();
  const { data: unlockInfos } = useUnlockRecords();
  const [tab, setTab] = useState(LockedAcornsTabEnum.Pending);

  const tabClassName = useMemo(
    () =>
      `${_tabClassName} ${isMobile ? 'text-[14px] leading-[16px] py-[8px]' : 'text-[20px] leading-[24px] py-[11px]'}`,
    [isMobile],
  );

  const renderPending = useCallback(() => {
    return (
      <>
        <div className="flex items-center gap-2 text-[16px] leading-[16px] font-fonarto mb-4">
          <img
            width={24}
            className="w-[24px] h-[24px]"
            src={require('assets/images/lock.png').default.src}
            alt="lock"
          />
          {`Total Locked ${divDecimalsStr(lockInfos?.totalLockedAmount, lockInfos?.decimals)}`}
          <img
            width={20}
            className="w-[20px] h-[20px]"
            src={require('assets/images/neat.png').default.src}
            alt="lock"
          />
          {`$ACORNS`}
        </div>
        <div
          className={`flex ${
            isMobile ? 'text-[12px]' : 'text-[16px]'
          }  leading-[18px] text-[#AE694C] bg-[#DEC49D] px-[16px] py-[9px] text-left rounded-[5px]`}>
          <div className="flex-1">Lock Time</div>
          <div className="flex-1">Unlock Time</div>
          <div className="flex-1 text-right">amount</div>
        </div>
        <div className="overflow-y-auto h-full">
          {lockInfos?.lockedInfoList.map((item, i) => (
            <div
              key={i}
              className={`flex  ${
                isMobile ? 'text-[12px]' : 'text-[16px]'
              } leading-[18px] text-[#953D22] p-4 text-left border-b-[1px] border-[#D3B68A]`}>
              <div className="flex-1">{item.lockedTime}</div>
              <div className="flex-1">{item.unLockTime}</div>
              <div className="flex-1 text-right">{`${divDecimalsStr(item.amount, item.decimals)} $${item.symbol}`}</div>
            </div>
          ))}
        </div>
      </>
    );
  }, [isMobile, lockInfos?.decimals, lockInfos?.lockedInfoList, lockInfos?.totalLockedAmount]);

  const renderUnlock = useCallback(() => {
    return (
      <>
        <div
          className={`flex  ${
            isMobile ? 'text-[12px]' : 'text-[16px]'
          } leading-[18px] text-[#AE694C] bg-[#DEC49D] px-[16px] py-[9px] text-left rounded-[5px]`}>
          <div className="flex-1">Unlocked time</div>
          <div className="flex-1 text-right">Amount</div>
        </div>
        <div className="overflow-y-auto h-full">
          {unlockInfos?.map((item, i) => (
            <div
              key={i}
              className={`flex  ${
                isMobile ? 'text-[12px]' : 'text-[16px]'
              } leading-[18px] text-[#953D22] p-4 text-left border-b-[1px] border-[#D3B68A]`}>
              <div className="flex-1">{item.unLockTime}</div>
              <div className="flex-1 flex justify-end items-center gap-2 text-right">
                {`${divDecimalsStr(item.amount, item.decimal)} $${item.symbol}`}{' '}
                <img
                  width={20}
                  className="w-[20px] h-[20px]"
                  src={require('assets/images/link-icon.png').default.src}
                  alt="link"
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }, [unlockInfos]);

  const handleClose = useCallback(() => {
    setTab(LockedAcornsTabEnum.Pending);
    onCancel?.();
  }, [onCancel]);

  return (
    <CustomModal
      className={`${isMobile ? '!w-[358px]' : '!w-[750px]'}`}
      open={open}
      onCancel={handleClose}
      {...props}
      title={`$ACORNS Unlocks`}
      destroyOnClose>
      <div className={`${isMobile ? 'h-[33rem]' : 'h-[41rem]'} flex flex-col`}>
        <div className="flex flex-col h-full">
          <div className={`${isMobile ? 'px-[16px]' : 'px-[40px]'} flex w-full`}>
            <button
              className={`${tabClassName} ${tab === LockedAcornsTabEnum.Pending ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
              onClick={() => setTab(LockedAcornsTabEnum.Pending)}>
              {LockedAcornsTabEnum.Pending}
            </button>
            <button
              className={`${tabClassName} ${tab === LockedAcornsTabEnum.Unlock ? 'bg-[#E8D1AE]' : 'bg-[#D3B68A]'}`}
              onClick={() => setTab(LockedAcornsTabEnum.Unlock)}>
              {LockedAcornsTabEnum.Unlock}
            </button>
          </div>
          <div
            className={`flex flex-col overflow-hidden space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1 ${
              isMobile ? 'p-[8px] mb-[8px]' : 'p-[24px] mb-[24px]'
            }`}>
            {tab === LockedAcornsTabEnum.Pending && renderPending()}
            {tab === LockedAcornsTabEnum.Unlock && renderUnlock()}
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
