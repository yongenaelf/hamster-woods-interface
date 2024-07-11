import styles from './style.module.css';

interface ICommonBtnProps {
  title?: string | React.ReactNode;
  onClick?: () => void | undefined;
  className?: string;
}

export default function CommonBtn({ title = 'Disable', onClick, className }: ICommonBtnProps) {
  return (
    <div className={`${styles.commonBtn} ${className}`} onClick={() => onClick?.()}>
      {title}
    </div>
  );
}
