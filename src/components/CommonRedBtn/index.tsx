import { MouseEventHandler } from 'react';
import styles from './style.module.css';

interface ICommonBtnProps {
  title?: string | React.ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  className?: string;
}

export default function CommonRedBtn({ title = 'Confirm', onClick, className }: ICommonBtnProps) {
  return (
    <div
      className={`${styles.commonBtn} ${className} text-stroke-[#C23B35] font-paytone text-[32px]`}
      onClick={onClick}>
      {title}
    </div>
  );
}
