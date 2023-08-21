import { ArrowDirection, ICheckerboardItem } from 'pageComponents/Recreation/checkerboard';
import React from 'react';
import Lattice from '../Lattice';

function Checkerboard(props: { value: ICheckerboardItem }) {
  const { value } = props;

  const Side = {
    [ArrowDirection.TOP]: (
      <div className="absolute left-0 right-0 top-[-10px] z-0 m-auto h-[12px] w-[16px] bg-[#656C8A]" />
    ),
    [ArrowDirection.BOTTOM]: (
      <div className="absolute bottom-[-2px] left-0 right-0 z-0 m-auto h-[12px] w-[16px] bg-[#656C8A]" />
    ),
    [ArrowDirection.LEFT]: (
      <div className="absolute bottom-0 left-[-16px] top-0 z-0 m-auto h-[16px] w-[20px] bg-[#656C8A]" />
    ),
    [ArrowDirection.RIGHT]: (
      <div className="absolute bottom-0 right-0 top-0 z-0 m-auto h-[16px] w-[20px] bg-[#656C8A]" />
    ),
  };

  return (
    <div className={`relative h-full w-full pb-[8px] pr-[12px]`}>
      <Lattice value={value} />
      {value.image && value.arrow && Side[value.arrow]}
    </div>
  );
}

export default React.memo(Checkerboard);
