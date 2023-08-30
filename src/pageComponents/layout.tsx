'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from 'components/Header';
import LoadingAnimation from 'components/Loading/LoadingAnimation';
// import WebLoginInstance from 'contract/webLogin';

import AWS from 'aws-sdk';
import dynamic from 'next/dynamic';

import { store } from 'redux/store';
import { setIsMobile, setLoginStatus } from 'redux/reducer/info';
import isMobile from 'utils/isMobile';
import Leaderboard from 'components/Leaderboard';
import { Store } from 'utils/store';
import { ConfigProvider, did } from '@portkey/did-ui-react';

import { usePathname } from 'next/navigation';
import PageLoading from 'components/PageLoading';
import GameRecord from 'components/GameRecord';
import useGetState from 'redux/state/useGetState';
import { KEY_NAME } from 'constants/platform';
import { LoginStatus } from 'redux/types/reducerTypes';
import { fetchChessboardData, fetchConfigItems } from 'api/request';
import { setConfigInfo } from 'redux/reducer/configInfo';
import { setChessboardData } from 'redux/reducer/chessboardData';
const { configInfo } = store.getState();

ConfigProvider.setGlobalConfig({
  storageMethod: new Store(),
  requestDefaults: {
    baseURL: '/portkey',
  },
  graphQLUrl: configInfo.configInfo?.graphqlServer,
});

const Layout = dynamic(async () => {
  return (props: React.PropsWithChildren<{}>) => {
    const { children } = props;

    const unLoadSourceRef = useRef(0);

    const [hasLoadedSource, setHasLoadedSource] = useState(false);

    const pathname = usePathname();

    const { isMobile: isMobileStore, chessBoardInfo, imageResources } = useGetState();

    const [resurceList, setResurceList] = useState<Array<string>>([]);

    const [chessMap, setChessMap] = useState<Array<string>>([]);

    const [sourceLoded, setSourceLoded] = useState(false);

    const loadResourceList = () => {
      if (!chessMap.length && !resurceList.length) {
        setTimeout(() => {
          setHasLoadedSource(true);
        }, 1000);
      }
      const sourceMap = [...chessMap, ...resurceList];

      const timeTask = new Promise(function (resolve) {
        setTimeout(resolve, 60000, false);
      });

      const scheduleTask = new Promise(function (resolve) {
        const start = Date.now();
        const schedule = (src: string) => {
          const img = document.createElement('img');
          img.src = src;
          const len = sourceMap.filter((i) => i).length;
          img.onload = () => {
            unLoadSourceRef.current = unLoadSourceRef.current + 1;
            if (unLoadSourceRef.current >= len) {
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
        console.log('over');
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
      if (typeof window !== undefined) {
        if (window.localStorage.getItem(KEY_NAME)) {
          did.reset();
          store.dispatch(setLoginStatus(LoginStatus.LOCK));
        }
      }
    }, []);

    const initConfigAndResurce = async () => {
      const [chessBoardRes, configRes] = await Promise.all([fetchChessboardData(), fetchConfigItems()]);
      configRes && store.dispatch(setConfigInfo(configRes.data));
      console.log('config', configRes.data);

      chessBoardRes && store.dispatch(setChessboardData(chessBoardRes.data));
    };

    useEffect(() => {
      sourceLoded && loadResourceList();
    }, [sourceLoded]);

    useEffect(() => {
      console.log('chessBoardInfo', chessBoardInfo);
      if (!chessBoardInfo || !imageResources) return;
      // const { imageResources, data } = chessBoardInfo as any;
      const imageResourcesArray: string[] = Object.values(imageResources);
      setResurceList(imageResourcesArray);
      const chessMap: string[] = [];
      if (chessBoardInfo.length) {
        chessBoardInfo.forEach((item, index) => {
          item.forEach((_, index1) => {
            chessMap.push(chessBoardInfo[index][index1].image!);
          });
        });
      }
      setChessMap(chessMap);
      setSourceLoded(true);
    }, [chessBoardInfo]);

    useEffect(() => {
      initConfigAndResurce();
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
        <AntdLayout className="xx-wrapper flex h-full w-[100vw] flex-col overflow-hidden">
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
