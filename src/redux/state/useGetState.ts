import { useSelector } from 'react-redux';
import { selectInfo } from '../reducer/info';

const useGetState = () => {
  const infoState = useSelector(selectInfo);

  return {
    isMobile: infoState.isMobile,
  };
};

export default useGetState;
