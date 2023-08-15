import { useEffect, useRef, useState } from 'react';
import { ArrowDirection, ICheckerboardItem } from './checkerboard';
import { Button } from 'antd';
import { CheckerboardList } from './checkerboard';
import styles from './index.module.css';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import dataAnimation from './data1.json';
import Checkerboard from './components/Checkerboard';
import Side from './components/Side';
import { checkerboardData } from './mockdata';

export default function Game() {
  const [translate, setTranslate] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const firstNode = checkerboardData[0][0];
  const firstNodePosition: [number, number] = [0, 0];
  const linkedList = useRef<CheckerboardList>();

  const [disabled, setDisabled] = useState<boolean>(false);

  const animationRef = useRef<LottieRefCurrentProps>(null);
  const translateRef = useRef<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const updatePosition = (x: number, y: number, state: boolean) => {
    setTranslate({
      x: x,
      y: y,
    });
    setDisabled(state);
  };

  const getList = (node: ICheckerboardItem, nodePosition: [number, number]) => {
    const current = {
      row: nodePosition[0],
      column: nodePosition[1],
    };

    linkedList.current?.append(current);

    if (node.arrow) {
      let nextPosition: any = [];
      switch (node.arrow) {
        case ArrowDirection.LEFT:
          nextPosition = [nodePosition[0], nodePosition[1] - 1];
          break;
        case ArrowDirection.RIGHT:
          nextPosition = [nodePosition[0], nodePosition[1] + 1];
          break;
        case ArrowDirection.TOP:
          nextPosition = [nodePosition[0] - 1, nodePosition[1]];
          break;
        case ArrowDirection.BOTTOM:
          nextPosition = [nodePosition[0] + 1, nodePosition[1]];
          break;
      }

      if (nextPosition[0] === firstNodePosition[0] && nextPosition[1] === firstNodePosition[1]) {
        return;
      } else {
        getList(checkerboardData[nextPosition[0]][nextPosition[1]], nextPosition);
      }
    }
  };

  const jump = (step: number) => {
    if (linkedList.current) {
      const next = linkedList.current.jump({
        step,
        animation: animationRef.current!,
        baseWidth: translateRef.current.x,
        baseHeight: translateRef.current.y,
      });
      next((x, y, state) => updatePosition(x, y, state));
    }
  };

  useEffect(() => {
    animationRef.current?.pause();
    translateRef.current = {
      x: document.getElementById('animationId')?.clientWidth || 0,
      y: document.getElementById('animationId')?.clientHeight || 0,
    };
    linkedList.current = new CheckerboardList({
      baseWidth: translateRef.current.x,
      baseHeight: translateRef.current.y,
    });
    getList(firstNode, firstNodePosition);
  }, [checkerboardData]);

  return (
    <div className={styles.game}>
      <div className="flex-1 flex w-full overflow-hidden">
        <Side side="left" />
        <div className="relative flex-1 pt-[3.3rem] pl-[1.6rem]">
          <div
            id="animationId"
            className={`absolute top-[3.3rem] pr-[1.2rem] pb-[0.8rem] left-[1.6rem] flex items-center justify-center aspect-[56/60] translate-x-[0rem] translate-y-[0rem] duration-[3000] z-50`}
            style={{
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              width: `calc(100% / ${checkerboardData?.[0]?.length})`,
              // eslint-disable-next-line no-inline-styles/no-inline-styles
              transition: 'transform 2s linear',
              transform: `translate(${translate.x}px, ${translate.y}px)`,
            }}>
            <Lottie lottieRef={animationRef} animationData={dataAnimation} />
          </div>
          {checkerboardData.map((row, index) => {
            return (
              <div key={index} className="flex">
                {row.map((column) => {
                  return (
                    <div
                      key={column.id}
                      className={`aspect-[56/60]`}
                      style={{
                        width: `calc(100% / ${row.length})`,
                      }}>
                      <Checkerboard value={column} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Side />
      </div>

      <div className="h-[12rem] w-full bg-[#D9D9D9]">bottom</div>

      <div className="flex">
        <Button disabled={disabled} className="w-[10rem] h-[4rem] bg-blue-600" onClick={() => jump(4)}>
          jump
        </Button>
      </div>
    </div>
  );
}
