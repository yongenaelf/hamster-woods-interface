import { useIsMobile } from 'redux/selector/mobile';

export const Bean = () => {
  const isMobile = useIsMobile();

  return (
    <img
      className={`h-8 ${isMobile ? 'mx-3' : 'mx-8'}`}
      src={require('assets/images/bean.png').default.src}
      alt="bean"
    />
  );
};
