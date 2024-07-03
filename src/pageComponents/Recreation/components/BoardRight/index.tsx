import React, { ReactNode } from 'react';
import styles from './index.module.css';

function BoardRight({ children }: { children: ReactNode }) {
  return (
    <div className={styles['game__pc__side']}>
      <div className="z-30 h-full w-full">{children}</div>
    </div>
  );
}

export default React.memo(BoardRight);
