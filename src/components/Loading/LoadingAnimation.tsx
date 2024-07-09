import { useLottie } from 'lottie-react';
import LoadingAnimationJson from 'assets/images/loading-animation.json';
import useGetState from 'redux/state/useGetState';
import { TelegramPlatform } from '@portkey/did-ui-react';
import GameComing from 'assets/images/game-coming.png';

export default function LoadingAnimation() {
  const { isMobile } = useGetState();
  const { imageResources } = useGetState();

  const Animation = () => {
    const options = {
      animationData: LoadingAnimationJson,
      loop: true,
      autoplay: true,
    };

    const { View } = useLottie(options, { margin: '0 auto', width: isMobile ? '110px' : '148px' });

    return View;
  };

  return (
    <div
      style={{
        backgroundImage: isMobile
          ? `url(${imageResources?.['game-bg-mobile']})`
          : `url(${imageResources?.['game-bg-pc']})`,
      }}
      className={`h-full w-full overflow-hidden bg-cover ${
        TelegramPlatform.isTelegramPlatform() ? 'pt-[18px]' : isMobile ? 'pt-[440px]' : 'pt-[7vh]'
      }`}>
      {isMobile ? null : (
        <img
          src={imageResources?.['hamster-logo']}
          width={isMobile ? 'w-[240px]' : 'w-[480px]'}
          alt="logo"
          className={`mx-auto ${isMobile ? 'h-[240px] w-[240px]' : 'h-[480px] w-[480px]'}`}></img>
      )}
      <img
        width={isMobile ? 'w-[285px]' : 'w-[480px]'}
        src={GameComing.src}
        alt="coming"
        className={`mx-auto ${isMobile ? 'w-[285px]' : 'w-[480px]'}`}></img>
      <Animation></Animation>
    </div>
  );
}
