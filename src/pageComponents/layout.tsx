'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from 'components/Header';
import LoadingAnimation from 'components/Loading/LoadingAnimation';
// import WebLoginInstance from 'contract/webLogin';

import AWS from 'aws-sdk';
import dynamic from 'next/dynamic';

import { store } from 'redux/store';
import { setIsMobile } from 'redux/reducer/info';
import isMobile from 'utils/isMobile';
import Leaderboard from 'components/Leaderboard';
import { Store } from 'utils/store';
import { ConfigProvider } from '@portkey/did-ui-react';
import sourceMap from 'constants/resource';

import { usePathname } from 'next/navigation';
import PageLoading from 'components/PageLoading';
import GameRecord from 'components/GameRecord';
import useGetState from 'redux/state/useGetState';

ConfigProvider.setGlobalConfig({
  storageMethod: new Store(),
  requestDefaults: {
    baseURL: '/portkey',
  },
  graphQLUrl: '/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql',
});

const Layout = dynamic(async () => {
  return (props: React.PropsWithChildren<{}>) => {
    const { children } = props;

    const unLoadSourceRef = useRef(0);

    const [hasLoadedSource, setHasLoadedSource] = useState(false);

    const pathname = usePathname();

    const { isMobile: isMobileStore } = useGetState();

    const loadResourceList = () => {
      if (!sourceMap.length) {
        setTimeout(() => {
          setHasLoadedSource(true);
        }, 1000);
      }
      const timeTask = new Promise(function (resolve) {
        setTimeout(resolve, 60000, false);
      });

      const scheduleTask = new Promise(function (resolve) {
        const start = Date.now();
        const schedule = (src: string) => {
          const img = document.createElement('img');
          img.src = src;
          img.onload = () => {
            unLoadSourceRef.current = unLoadSourceRef.current + 1;
            if (unLoadSourceRef.current >= sourceMap.length) {
              if (Date.now() - start > 3000) {
                resolve(true);
              } else {
                setTimeout(() => {
                  resolve(true);
                }, 3000 - (Date.now() - start));
              }
            }
          };
        };
        sourceMap.forEach((src) => {
          schedule(src);
        });
      });

      Promise.race([timeTask, scheduleTask]).then(() => {
        setHasLoadedSource(true);
      });
    };

    const initAwsConfig = () => {
      AWS.config.update({
        region: 'ap-northeast-1',
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'identityPoolID',
        }),
      });
    };

    const showHeaderAndFooter = useMemo(() => {
      return pathname === '/';
    }, [pathname]);

    useEffect(() => {
      loadResourceList();
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

    return hasLoadedSource ? (
      <>
        <AntdLayout className="xx-wrapper flex h-[100vh] w-[100vw] flex-col overflow-hidden">
          {showHeaderAndFooter && isMobileStore && <Header />}
          <AntdLayout.Content className="marketplace-content flex-1 overflow-hidden" id="marketplace-content">
            {children}
            <Leaderboard />
            <GameRecord />
          </AntdLayout.Content>
          <PageLoading />
        </AntdLayout>
      </>
    ) : (
      <LoadingAnimation />
    );
  };
});

export default Layout;
