import { LottieRefCurrentProps } from 'lottie-react';

export enum ArrowDirection {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export interface ICheckerboardItem {
  id: number;
  arrow?: ArrowDirection;
  arrowColor?: string;
  image?: string;
}

export interface ICheckerboardNode {
  row: number;
  column: number;
}

export class CheckerboardNode {
  info: ICheckerboardNode;
  next: CheckerboardNode | null;
  constructor(val: ICheckerboardNode) {
    this.info = val;
    this.next = null;
  }
}

export class CheckerboardList {
  private head: CheckerboardNode | null;
  private currentNode: CheckerboardNode | null;
  private step: number;
  private baseWidth: number;
  private baseHeight: number;
  private translate: {
    x: number;
    y: number;
  };

  constructor(props?: {
    baseWidth?: number;
    baseHeight?: number;
    translate?: {
      x: number;
      y: number;
    };
  }) {
    this.head = null;
    this.currentNode = null;
    this.step = 0;
    this.baseWidth = props?.baseWidth ?? 60;
    this.baseHeight = props?.baseHeight ?? 60;
    this.translate = {
      x: props?.translate?.x ?? 0,
      y: props?.translate?.y ?? 0,
    };
  }

  private next(animation: LottieRefCurrentProps, callback: (x: number, y: number, state: boolean) => void) {
    const current = this.currentNode || this.head;
    if (current?.next) {
      const nextNode = current.next;
      const x = (nextNode.info.column - current.info.column) * this.baseWidth;
      const y = (nextNode.info.row - current.info.row) * this.baseHeight;
      this.currentNode = nextNode;
      animation.play();
      this.translate = {
        x: x + this.translate.x,
        y: y + this.translate.y,
      };
      callback(this.translate.x, this.translate.y, this.step - 1 > 0);
      const timer = setTimeout(() => {
        animation.pause();
        clearTimeout(timer);
      }, 2000);
      const timer2 = setTimeout(() => {
        this.step -= 1;
        if (this.step > 0) {
          this.next(animation, callback);
        }
        clearTimeout(timer2);
      }, 2500);
    }
  }

  append(value: ICheckerboardNode) {
    const newNode = new CheckerboardNode(value);

    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let current: CheckerboardNode | null = this.head;
      while (current?.next && current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
  }

  jump(params: { step: number; animation: LottieRefCurrentProps; baseWidth?: number; baseHeight?: number }) {
    this.step = params.step;

    return (callback: (x: number, y: number, state: boolean) => void) => {
      this.next(params.animation, callback);
    };
  }
}
