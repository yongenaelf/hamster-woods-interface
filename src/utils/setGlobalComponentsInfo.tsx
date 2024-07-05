import { notification } from 'antd';
import { ReactNode } from 'react';
import { setPageLoading } from 'redux/reducer/globalComponentsInfo';
import { dispatch } from 'redux/store';
import Error from 'assets/images/error.svg';
import Success from 'assets/images/success.svg';
import { ArgsProps } from 'antd/lib/notification';

function openPageLoading(content?: ReactNode) {
  dispatch(
    setPageLoading({
      open: true,
      content,
    }),
  );
}

function hidePageLoading() {
  dispatch(
    setPageLoading({
      open: false,
    }),
  );
}

function error(content?: ReactNode, duration = 2, params?: ArgsProps) {
  notification.error({
    key: 'error',
    prefixCls: 'ant-notification',
    message: content || 'FailedOperation!',
    placement: 'top',
    closeIcon: <></>,
    icon: <Error className="h-[24Px] w-[24Px]" />,
    duration,
    maxCount: 1,
    className: 'bean-show-message-error',
    ...params,
  });
}

function success(content?: ReactNode, duration = 2, params?: ArgsProps) {
  notification.error({
    key: 'error',
    prefixCls: 'ant-notification',
    message: content || 'Successfully!',
    placement: 'top',
    closeIcon: <></>,
    icon: <Success className="h-[24Px] w-[24Px]" />,
    duration,
    maxCount: 1,
    className: 'bean-show-message-success',
    ...params,
  });
}

function destroy(key?: string) {
  if (key) {
    notification.close(key);
  } else {
    notification.destroy();
  }
}

const showMessage = {
  loading: openPageLoading,
  hideLoading: hidePageLoading,
  error,
  success,
  destroy,
};

export default showMessage;
