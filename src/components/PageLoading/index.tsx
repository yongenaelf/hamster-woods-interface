import { Modal } from 'antd';
import React from 'react';

import styles from './index.module.css';
import Lottie from 'lottie-react';

import loadingAnimation from 'assets/images/page-loading-animation.json';
import useGetState from 'redux/state/useGetState';
import { useSelector } from 'redux/store';
import { getPageLoading } from 'redux/reducer/globalComponentsInfo';

function PageLoading() {
  const { isMobile } = useGetState();
  const { open } = useSelector(getPageLoading);

  return (
    <Modal
      open={open}
      footer={null}
      keyboard={false}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      className={styles['page-modal']}>
      <Lottie className={`${isMobile ? 'scale-[3.5]' : ''}`} animationData={loadingAnimation} />
    </Modal>
  );
}

export default React.memo(PageLoading);
