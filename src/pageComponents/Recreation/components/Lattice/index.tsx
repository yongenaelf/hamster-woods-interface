import React from 'react';
import styles from './index.module.css';
import Image from 'next/image';
import Arrow from 'assets/images/arrow.svg';
import { ICheckerboardItem } from 'pageComponents/Recreation/checkerboard';

function Lattice(props: { value: ICheckerboardItem }) {
  const { value } = props;

  if (value.image) {
    return (
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center rounded-[0.6rem] ${styles['lattice-container']} bg-transparent`}>
        <Image width={60} height={60} className="h-full w-full" src={value.image} alt="image" />
        {value.arrowColor && (
          <div className={`absolute text-[1.6rem] text-[${value.arrowColor}]`}>
            <Arrow className={`text-[1.6rem] text-[${value.arrowColor}]`} />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default React.memo(Lattice);
