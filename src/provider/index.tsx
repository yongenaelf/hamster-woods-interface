'use client';

import StoreProvider from './store';
import { ConfigProvider } from 'antd';

import enUS from 'antd/lib/locale/en_US';

import WebLoginProvider from './webLoginProvider';
import { useEffect, useState } from 'react';
import { store } from 'redux/store';

import { fetchConfigItems } from 'api/request';
import { setConfigInfo } from 'redux/reducer/configInfo';

function Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const storeConfig = async () => {
    const { data } = await fetchConfigItems();
    store.dispatch(setConfigInfo(data));

    setLoading(false);
  };
  useEffect(() => {
    storeConfig();
  }, []);
  return (
    <>
      <StoreProvider>
        <ConfigProvider locale={enUS} autoInsertSpaceInButton={false} prefixCls={'ant'}>
          <WebLoginProvider>{children}</WebLoginProvider>
        </ConfigProvider>
      </StoreProvider>
    </>
  );
}

export default Provider;
