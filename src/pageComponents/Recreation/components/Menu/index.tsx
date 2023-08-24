import React, { ReactNode } from 'react';
import styles from './index.module.css';
import useGetState from 'redux/state/useGetState';

interface IMenu {
  icon?: ReactNode;
  title: string;
  className?: string;
  handle?: <T, R>(params?: T) => R;
  onClick?: () => void;
}

function Menu(props: IMenu) {
  const { title, icon, className = '', onClick } = props;
  const { isMobile } = useGetState();

  if (isMobile) {
    return (
      <div className={`${styles['menu-mobile']} ${className}`} onClick={onClick}>
        {icon && (
          <div className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#305CD9] shadow-[0_-0.9px_0.9px_0_#3687FF4D] shadow-[0_0.9px_3.6px_0_#0048B6_inset]">
            <div className="position bottom-0 left-0 right-0 top-0 m-auto ">{icon}</div>
          </div>
        )}
        {title && <span className={`${styles['menu__title']}`}>{title}</span>}
      </div>
    );
  } else {
    return (
      <div className={`${styles.menu} cursor-custom ${className}`} onClick={onClick}>
        {icon && (
          <div className="relative flex aspect-[1/1] h-full items-center justify-center rounded-full bg-[#305CD9] shadow-[0_-0.9px_0.9px_0_#3687FF4D] shadow-[0_0.9px_3.6px_0_#0048B6_inset]">
            <div className="position bottom-0 left-0 right-0 top-0 m-auto ">{icon}</div>
          </div>
        )}
        {title && <span className={`${styles['menu__title']}`}>{title}</span>}
      </div>
    );
  }
}

export default React.memo(Menu);
