'use client';

import '@portkey/did-ui-react/dist/assets/index.css';
import 'aelf-web-login/dist/assets/index.css';
import { PortkeyConfigProvider } from '@portkey/did-ui-react';
import dynamic from 'next/dynamic';

import { store } from 'redux/store';

const APP_NAME = 'forest';

const WebLoginProviderDynamic = dynamic(
  async () => {
    const info = store.getState().info.baseInfo;

    const weblogin = await import('aelf-web-login').then((module) => module);

    weblogin.setGlobalConfig({
      appName: APP_NAME,
      chainId: 'chainId',
      portkey: {
        useLocalStorage: true,
        graphQLUrl: 'graphQLUrl',
        connectUrl: 'connectUrl',
        socialLogin: {
          Portkey: {
            websiteName: APP_NAME,
            websiteIcon: 'https://explorer.aelf.io/favicon.main.ico',
          },
        },
        requestDefaults: {
          timeout: 80000,
          baseURL: 'baseURL',
        },
        network: {
          defaultNetwork: 'networkType',
          networkList: [
            {
              name: `aelf ${'networkType'}`,
              walletType: 'aelf',
              networkType: 'networkType',
              isActive: true,
              apiUrl: 'apiUrl',
              graphQLUrl: `graphQLUrl`,
              connectUrl: 'connectUrl',
            },
          ],
        },
      },
      aelfReact: {
        appName: APP_NAME,
        nodes: {
          AELF: {
            chainId: 'AELF',
            rpcUrl: 'rpcUrl',
          },
          tDVW: {
            chainId: 'tDVW',
            rpcUrl: 'rpcUrl',
          },
          tDVV: {
            chainId: 'tDVV',
            rpcUrl: 'rpcUrl',
          },
        },
      },
      defaultRpcUrl: 'defaultRpcUrl',
      networkType: 'MAIN',
    });
    return weblogin.WebLoginProvider;
  },
  { ssr: false },
);

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <PortkeyConfigProvider>
      <WebLoginProviderDynamic
        nightElf={{
          useMultiChain: true,
          connectEagerly: true,
        }}
        portkey={{
          autoShowUnlock: false,
          checkAccountInfoSync: true,
        }}
        extraWallets={['discover', 'elf']}
        discover={{
          autoRequestAccount: true,
          autoLogoutOnDisconnected: true,
          autoLogoutOnNetworkMismatch: true,
          autoLogoutOnAccountMismatch: true,
          autoLogoutOnChainMismatch: true,
        }}>
        {children}
      </WebLoginProviderDynamic>
    </PortkeyConfigProvider>
  );
};
