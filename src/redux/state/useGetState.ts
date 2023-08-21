import { useSelector } from 'react-redux';
import { selectInfo } from '../reducer/info';
import { LoginStatus } from 'redux/types/reducerTypes';

const useGetState = () => {
  const infoState = useSelector(selectInfo);

  return {
    isMobile: infoState.isMobile,
    isLogin: infoState.loginStatus === LoginStatus.LOGGED,
    walletType: infoState.walletType,
    walletInfo: infoState.walletInfo,
  };
};

export default useGetState;
