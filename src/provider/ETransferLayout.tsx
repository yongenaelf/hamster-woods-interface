'use client';

import React, { useEffect } from 'react';
import { ETransferConfig, ETransferLayoutProvider, ETransferStyleProvider, NetworkType } from '@etransfer/ui-react';
import useGetState from 'redux/state/useGetState';
import '@etransfer/ui-react/dist/assets/index.css';
import { ChainId } from '@portkey/types';

export default function ETransferLayout({ children }: { children: React.ReactNode }) {
  const { configInfo } = useGetState();

  useEffect(() => {
    if (!configInfo) return;

    // TODO use cms config
    ETransferConfig.setConfig({
      depositConfig: {
        defaultDepositToken: configInfo?.eTransferDefaultDepositToken,
        supportDepositTokens: [configInfo?.eTransferDefaultDepositToken],
        defaultReceiveToken: configInfo?.eTransferDefaultReceiveToken,
        supportReceiveTokens: [configInfo?.eTransferDefaultReceiveToken],
        defaultChainId: configInfo?.eTransferDefaultChainId as ChainId,
        defaultNetwork: configInfo?.eTransferDefaultNetwork,
      },
      authorization: {
        jwt: '', // ETransfer Auth Token
      },
      networkType: configInfo?.network as NetworkType, // 'TESTNET' | 'MAINNET'
      etransferAuthUrl: configInfo?.eTransferUrl,
      etransferUrl: configInfo?.eTransferUrl,
    });
  }, [configInfo]);

  if (!configInfo) {
    return <>{children}</>;
  }

  return (
    <ETransferStyleProvider>
      <ETransferLayoutProvider>{children}</ETransferLayoutProvider>
    </ETransferStyleProvider>
  );
}
