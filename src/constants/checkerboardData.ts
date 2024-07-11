import { ArrowDirection, CheckerboardType, ICheckerboardItem } from 'pageComponents/Recreation/checkerboard';

export const checkerboardData: ICheckerboardItem[][] = [
  [
    {
      id: 1,
      type: CheckerboardType.TREASURE,
      arrow: ArrowDirection.RIGHT,
      image: 'step-treasure.png',
    },
    {
      id: 2,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.RIGHT,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 3,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.BOTTOM,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
    {
      id: 4,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 5,
      type: CheckerboardType.EMPTY,
      image: '',
    },
  ],
  [
    {
      id: 6,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.TOP,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
    {
      id: 7,
      type: CheckerboardType.IMAGE,
      image: 'bg-image-01.png',
    },
    {
      id: 8,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.RIGHT,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 9,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.BOTTOM,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 10,
      type: CheckerboardType.EMPTY,
      image: '',
    },
  ],
  [
    {
      id: 11,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.TOP,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 12,
      type: CheckerboardType.IMAGE,
      image: 'bg-image-02.png',
      width: 2,
      height: 2,
    },
    {
      id: 13,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 14,
      type: CheckerboardType.TREASURE,
      arrow: ArrowDirection.RIGHT,
      image: 'step-treasure.png',
    },
    {
      id: 15,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.BOTTOM,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
  ],
  [
    {
      id: 16,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.TOP,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 17,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 18,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 19,
      type: CheckerboardType.IMAGE,
      image: 'bg-image-03.png',
      width: 1,
      height: 2,
    },
    {
      id: 20,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.BOTTOM,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
  ],
  [
    {
      id: 21,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.TOP,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
    {
      id: 22,
      type: CheckerboardType.TREASURE,
      arrow: ArrowDirection.LEFT,
      image: 'step-treasure.png',
    },
    {
      id: 23,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.LEFT,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 24,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 25,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.BOTTOM,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
  ],
  [
    {
      id: 12,
      type: CheckerboardType.IMAGE,
      image: 'bg-image-04.png',
      width: 2,
      height: 2,
    },
    {
      id: 27,
      type: CheckerboardType.EMPTY,
      image: '',
    },
    {
      id: 28,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.TOP,
      image: 'step-special-top.png',
      arrowColor: '#D38326',
    },
    {
      id: 29,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.LEFT,
      image: 'step-ordinary-top.png',
      arrowColor: '#C6B392',
    },
    {
      id: 30,
      type: CheckerboardType.ORDINARY,
      arrow: ArrowDirection.LEFT,
      image: 'step-start.png',
    },
  ],
];
