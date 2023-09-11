import { notification } from 'antd';
import { ReactNode } from 'react';
import { setPageLoading } from 'redux/reducer/globalComponentsInfo';
import { dispatch } from 'redux/store';
import Info from 'assets/images/info.svg';
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
    icon: <Info className="mt-[2px] h-[20Px] w-[20Px]" />,
    duration,
    maxCount: 1,
    className: 'bean-show-message-error',
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
  destroy,
};

export default showMessage;
