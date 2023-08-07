'use client';

import StoreProvider from './store';
import { ConfigProvider } from 'antd';

import enUS from 'antd/lib/locale/en_US';

import WebLoginProvider from './webLoginProvider';
import { useEffect, useState } from 'react';
import { store } from 'redux/store';
import Loading from 'components/Loading';

import { fetchConfig } from 'api/request';

function Provider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const storeConfig = async () => {
    // const { data } = await fetchConfig();
    // u can update data to store
    setLoading(false);
  };
  useEffect(() => {
    storeConfig();
  }, []);
  return (
    <>
      <StoreProvider>
        <ConfigProvider locale={enUS} autoInsertSpaceInButton={false} prefixCls={'xx'}>
          {loading ? <Loading></Loading> : <WebLoginProvider>{children}</WebLoginProvider>}
        </ConfigProvider>
      </StoreProvider>
    </>
  );
}

export default Provider;
