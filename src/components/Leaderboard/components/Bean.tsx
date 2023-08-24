import { useIsMobile } from 'redux/selector/mobile';

export const Bean = () => {
  const isMobile = useIsMobile();

  return (
    <img
      className={`${isMobile ? 'mx-2 h-6' : 'mx-8 h-8'}`}
      src={require('assets/images/bean.png').default.src}
      alt="bean"
    />
  );
};
