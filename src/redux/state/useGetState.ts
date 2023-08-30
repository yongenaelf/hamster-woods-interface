import { useSelector } from 'react-redux';
import { selectInfo } from '../reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';
import { getConfigInfo } from 'redux/reducer/configInfo';
import { getChessboardData, getImageResources } from 'redux/reducer/chessboardData';

const useGetState = () => {
  const infoState = useSelector(selectInfo);
  const configInfo = useSelector(getConfigInfo);
  const chessBoardInfo = useSelector(getChessboardData);
  const imageResources = useSelector(getImageResources);

  return {
    isMobile: infoState.isMobile,
    isLogin: infoState.loginStatus === LoginStatus.LOGGED,
    isLock: infoState.loginStatus === LoginStatus.LOCK,
    walletType: infoState.walletType,
    walletInfo: infoState.walletInfo,
    assetVisible: infoState.assetVisible,
    playerInfo: infoState.playerInfo,
    configInfo,
    chessBoardInfo,
    imageResources,
  };
};

export default useGetState;
