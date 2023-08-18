import { MouseEvent } from 'react';

export type BeanPassModalPropsType = {
  onConfirm?: (e: MouseEvent<any>) => void;
  onCancel: (e: MouseEvent<any>) => void;
  open: boolean;
  type: GetBeanPassStatus;
};

export enum GetBeanPassStatus {
  Unacclaimed = 'unaccalimed',
  Recharge = 'recharge',
  Abled = 'abled',
  Noneleft = 'noneleft',
  Notfound = 'notfound',
  Waiting = 'waiting',
}
