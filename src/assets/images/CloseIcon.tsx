import React from 'react';
import closeImg from './close.png';
import Image from 'next/image';
import useGetState from 'redux/state/useGetState';

export default function CloseIcon({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const { isMobile } = useGetState();
  return (
    <Image
      src={closeImg}
      alt="closeImg"
      onClick={onClick}
      className={`${isMobile ? 'w-[24px] h-[24px]' : 'w-[50px] h-[50px]'} ${className}`}
    />
  );
}
