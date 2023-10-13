import { useIsMobile } from 'redux/selector/mobile';

export const Me = () => {
  const isMobile = useIsMobile();

  return (
    <img
      className={`${isMobile ? 'mx-2 h-4' : 'mx-8 h-8'}`}
      src={require('assets/images/me.png').default.src}
      alt="me"
    />
  );
};
