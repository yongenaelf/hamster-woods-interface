import React, { useEffect } from 'react';
import { ANIMATION_DURATION } from 'contract/animation';

import beanImage from 'assets/images/recreation/bean.png';

import styles from './index.module.css';
import Image from 'next/image';

interface IRole {
  id?: string;
  width: string | number;
  bean?: number;
  translate: {
    x: number;
    y: number;
  };
  animationDuration?: number;
  showAdd?: boolean;
  hideAdd?: () => void;
  children?: React.ReactNode;
}

function Role(props: IRole) {
  const {
    id = 'animationId',
    width,
    bean,
    translate,
    animationDuration = ANIMATION_DURATION,
    showAdd,
    hideAdd,
    children,
  } = props;

  useEffect(() => {
    if (showAdd) {
      const timer = setTimeout(() => {
        hideAdd && hideAdd();
        clearTimeout(timer);
      }, 2000);
    }
  }, [showAdd]);

  return (
    <div
      id={id}
      className={`absolute bottom-0 right-0 z-50 flex items-center justify-center pb-[8px] pr-[12px]`}
      style={{
        width: width,
        transition: `transform ${animationDuration}ms linear`,
        transform: `translate(${translate.x}px, ${translate.y}px)`,
      }}>
      <div className="aspect-[56/60] w-full">
        <div className={styles.role}>
          <div className="mb-[4px] aspect-[82/50] h-auto w-[150%] overflow-hidden">
            {showAdd && bean && (
              <div
                className={`relative h-full w-full bg-[url(/images/recreation/add-bean.svg)] bg-[100%_100%] bg-no-repeat ${styles['appears-animation']}`}>
                <div className={`flex h-full w-full items-center pb-[8px] pl-[6px] ${styles['role__info']}`}>
                  <Image className="h-[32px] w-[32px]" src={beanImage} alt="bean" />
                  <span className="ml-[4px] text-[20px] leading-[24px] text-[#FFFFFF]">+{bean}</span>
                </div>
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Role);
