import { useSelector } from '../store';

export const useIsMobile = () => useSelector((state) => state.info.isMobile);
