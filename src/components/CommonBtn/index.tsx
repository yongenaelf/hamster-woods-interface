import { HtmlHTMLAttributes } from 'react';
import styles from './style.module.css';
import { DividerProps } from 'antd';

interface ICommonBtnProps {
  title?: string;
}

export default function CommonBtn({ title = 'Confirm' }: ICommonBtnProps & HtmlHTMLAttributes<DividerProps>) {
  return <div className={styles.commonModal}>{title}</div>;
}
