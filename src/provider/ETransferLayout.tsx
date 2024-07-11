'use client';

import React, { useEffect } from 'react';
import { ETransferConfig, ETransferProvider, ETransferStyleProvider, NetworkType } from '@etransfer/ui-react';
import useGetState from 'redux/state/useGetState';
import '@etransfer/ui-react/dist/assets/index.css';

export default function ETransferLayout({ children }: { children: React.ReactNode }) {
  const { configInfo } = useGetState();

  useEffect(() => {
    if (!configInfo) return;
    // TODO use cms config
    ETransferConfig.setConfig({
      depositConfig: {
        defaultDepositToken: 'USDT',
        // supportDepositTokens: ['ACORNS', 'ELF'],
        defaultReceiveToken: 'ACORNS',
        defaultChainId: configInfo.curChain,
        defaultNetwork: 'SETH',
      },
      authorization: {
        jwt: '', // ETransfer Auth Token
      },
      networkType: configInfo?.network as NetworkType, // 'TESTNET' | 'MAINNET'
      etransferAuthUrl: 'https://test.etransfer.exchange',
      etransferUrl: 'https://test.etransfer.exchange',
    });
  }, [configInfo]);

  if (!configInfo) {
    return <>{children}</>;
  }

  return (
    <ETransferProvider>
      <ETransferStyleProvider>{children}</ETransferStyleProvider>
    </ETransferProvider>
  );
}
