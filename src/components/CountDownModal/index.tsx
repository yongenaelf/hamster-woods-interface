'use client';
import { MouseEvent } from 'react';

import CommonBtn from 'components/CommonBtn';
import useCountdown from 'hooks/useCountDown';
import { formatTime } from 'utils/formatTime';
import CustomModal from 'components/CustomModal';

export type CountDownModalPropsType = {
  onConfirm?: (e: MouseEvent<any>) => void;
  onCancel: (e: MouseEvent<any>) => void;
  open: boolean;
  btnText?: string;
};

export default function CountDownModal({ onCancel, open, onConfirm, btnText }: CountDownModalPropsType) {
  const { hours, minutes, seconds } = useCountdown();
  return (
    <CustomModal open={open} title="Notice" onCancel={onCancel} destroyOnClose className="flex justify-center">
      <p className="text-2xl">
        {`Your hamster has used up all its HOPs for today. New HOPs will be available in `}
        <span className="font-black">
          {formatTime({
            hours,
            minutes,
            seconds,
          })}
        </span>
      </p>
      <p className="text-2xl leading-6">
        {`If you want to help it hop some more, click the button below to get more chances.`}.
      </p>
      <CommonBtn
        title={btnText || 'Confirm'}
        className="mx-[64px] mt-[40px] mb-[5px] h-[60px] text-[32px] leading-[40px]"
        onClick={onConfirm}
      />
    </CustomModal>
  );
}
