'use client';
import React, { useEffect, Suspense } from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
// import WebLoginInstance from 'contract/webLogin';

import AWS from 'aws-sdk';
import dynamic from 'next/dynamic';

import { store, dispatch } from 'redux/store';
import { selectInfo, setIsMobile } from 'redux/reducer/info';
import isMobile from 'utils/isMobile';
import { SupportedELFChainId } from 'types';
import Leaderboard from 'components/Leaderboard';

const Layout = dynamic(async () => {
  const info = store.getState().info.baseInfo;

  return (props: React.PropsWithChildren<{}>) => {
    const { children } = props;

    const initAwsConfig = () => {
      AWS.config.update({
        region: 'ap-northeast-1',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'identityPoolID',
        }),
      });
    };

    useEffect(() => {
      initAwsConfig();

      const resize = () => {
        const ua = navigator.userAgent;
        const mobileType = isMobile(ua);
        const isMobileDevice =
          mobileType.apple.phone || mobileType.android.phone || mobileType.apple.tablet || mobileType.android.tablet;
        store.dispatch(setIsMobile(isMobileDevice));
      };
      resize();
      window.addEventListener('resize', resize);
      return () => {
        window.removeEventListener('resize', resize);
      };
    }, []);

    return (
      <>
        <AntdLayout className="xx-wrapper flex h-[100vh] w-[100vw] flex-col overflow-hidden">
          <Header />
          <AntdLayout.Content className="marketplace-content flex-1 overflow-hidden" id="marketplace-content">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </AntdLayout.Content>
          <Footer />
          <Leaderboard />
        </AntdLayout>
      </>
    );
  };
});

export default Layout;
