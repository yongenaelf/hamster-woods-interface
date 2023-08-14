import { ArrowDirection, ICheckerboardItem } from 'pageComponents/Recreation/checkerboard';
import React from 'react';
import Lattice from '../Lattice';

function Checkerboard(props: { value: ICheckerboardItem }) {
  const { value } = props;

  const Side = {
    [ArrowDirection.TOP]: (
      <div className="z-0 h-[1.2rem] w-[1.6rem] bg-[#656C8A] absolute left-0 right-0 top-[-1rem] m-auto" />
    ),
    [ArrowDirection.BOTTOM]: (
      <div className="z-0 h-[1.2rem] w-[1.6rem] bg-[#656C8A] absolute left-0 right-0 bottom-[-0.2rem] m-auto" />
    ),
    [ArrowDirection.LEFT]: (
      <div className="z-0 h-[1.6rem] w-[2rem] bg-[#656C8A] absolute left-[-1.6rem] top-0 bottom-0 m-auto" />
    ),
    [ArrowDirection.RIGHT]: (
      <div className="z-0 h-[1.6rem] w-[2rem] bg-[#656C8A] absolute right-0 top-0 bottom-0 m-auto" />
    ),
  };

  return (
    <div className={`w-full h-full pr-[1.2rem] pb-[0.8rem] relative`}>
      <Lattice value={value} />
      {value.image && value.arrow && Side[value.arrow]}
    </div>
  );
}

export default React.memo(Checkerboard);
