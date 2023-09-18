'use client';

import '@portkey/did-ui-react/dist/assets/index.css';
import { NetworkType, PortkeyProvider } from '@portkey/did-ui-react';
import useGetState from 'redux/state/useGetState';

export default ({ children }: { children: React.ReactNode }) => {
  const { configInfo } = useGetState();

  if (!configInfo) {
    return <>{children}</>;
  }
  return <PortkeyProvider networkType={configInfo?.network as NetworkType}>{children}</PortkeyProvider>;
};
