import { Modal } from 'antd';
import React from 'react';

import styles from './index.module.css';
import Lottie from 'lottie-react';

import loadingAnimation from 'assets/images/loading-animation.json';
import { useSelector } from 'redux/store';
import { getPageLoading } from 'redux/reducer/globalComponentsInfo';
import useGetState from 'redux/state/useGetState';

function PageLoading() {
  const { open, content } = useSelector(getPageLoading);
  const { isMobile } = useGetState();

  const getContent = () => {
    if (typeof content === 'string') {
      return (
        <span className={`text-[#fff] text-center font-paytone ${isMobile ? 'text-[16px]' : 'text-[24px]'}`}>
          {content}
        </span>
      );
    } else {
      return content;
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      keyboard={false}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      className={styles['page-modal']}>
      <div className="relative flex flex-col justify-center">
        <div className={`${isMobile ? 'w-[110px]' : 'w-[147px]'} m-auto`}>
          <Lottie animationData={loadingAnimation} />
        </div>
        {content && getContent()}
      </div>
    </Modal>
  );
}

export default React.memo(PageLoading);
