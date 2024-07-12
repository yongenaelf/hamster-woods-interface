'use client';

import StoreProvider from './store';
import { ConfigProvider } from 'antd';

import enUS from 'antd/lib/locale/en_US';

import WebLoginProvider from './webLoginProvider';
import { useEffect, useState } from 'react';
import ETransferLayout from './ETransferLayout';

function Provider({ children }: { children: React.ReactNode }) {
  const [_loading, setLoading] = useState(true);
  const storeConfig = async () => {
    setLoading(false);
  };
  useEffect(() => {
    storeConfig();
  }, []);
  return (
    <>
      <StoreProvider>
        <ConfigProvider locale={enUS} autoInsertSpaceInButton={false} prefixCls={'ant'}>
          <WebLoginProvider>
            <ETransferLayout>{children}</ETransferLayout>
          </WebLoginProvider>
        </ConfigProvider>
      </StoreProvider>
    </>
  );
}

export default Provider;
