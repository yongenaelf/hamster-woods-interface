import { ArrowDirection, ICheckerboardItem } from 'pageComponents/Recreation/checkerboard';
import React from 'react';
import Lattice from '../Lattice';

function Checkerboard(props: { value: ICheckerboardItem }) {
  const { value } = props;

  const Side = {
    [ArrowDirection.TOP]: (
      <div className="absolute left-0 right-0 top-[-1rem] z-0 m-auto h-[1.2rem] w-[1.6rem] bg-[#656C8A]" />
    ),
    [ArrowDirection.BOTTOM]: (
      <div className="absolute bottom-[-0.2rem] left-0 right-0 z-0 m-auto h-[1.2rem] w-[1.6rem] bg-[#656C8A]" />
    ),
    [ArrowDirection.LEFT]: (
      <div className="absolute bottom-0 left-[-1.6rem] top-0 z-0 m-auto h-[1.6rem] w-[2rem] bg-[#656C8A]" />
    ),
    [ArrowDirection.RIGHT]: (
      <div className="absolute bottom-0 right-0 top-0 z-0 m-auto h-[1.6rem] w-[2rem] bg-[#656C8A]" />
    ),
  };

  return (
    <div className={`relative h-full w-full pb-[0.8rem] pr-[1.2rem]`}>
      <Lattice value={value} />
      {value.image && value.arrow && Side[value.arrow]}
    </div>
  );
}

export default React.memo(Checkerboard);
