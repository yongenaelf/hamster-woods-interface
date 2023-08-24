import { useSelector } from 'react-redux';
import { selectInfo } from '../reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';

const useGetState = () => {
  const infoState = useSelector(selectInfo);

  return {
    isMobile: infoState.isMobile,
    isLogin: infoState.loginStatus === LoginStatus.LOGGED,
    isLock: infoState.loginStatus === LoginStatus.LOCK,
    walletType: infoState.walletType,
    walletInfo: infoState.walletInfo,
    assetVisible: infoState.assetVisible,
    playerInfo: infoState.playerInfo,
  };
};

export default useGetState;
