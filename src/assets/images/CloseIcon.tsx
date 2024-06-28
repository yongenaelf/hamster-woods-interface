import React from 'react';
import closeImg from './close.png';
import Image from 'next/image';

export default function CloseIcon({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return <Image src={closeImg} alt="closeImg" onClick={onClick} className={className} />;
}
