import { useLottie } from 'lottie-react';
import LoadingAnimation from 'assets/images/loading-animation.json';
import Image from 'next/image';
import useGetState from 'redux/state/useGetState';
import { TelegramPlatform } from '@portkey/did-ui-react';

export default function LoadingAni() {
  const { isMobile } = useGetState();
  const { imageResources } = useGetState();

  const Animation = () => {
    const options = {
      animationData: LoadingAnimation,
      loop: true,
      autoplay: true,
    };

    const { View } = useLottie(options, { margin: '0 auto', width: isMobile ? '30%' : '20%' });

    return View;
  };

  return (
    <div
      style={{
        backgroundImage: isMobile
          ? `url(${imageResources.playgroundBgMobile})`
          : `url(${imageResources.playgroundBgPc})`,
      }}
      className={`h-full w-full overflow-hidden ${
        TelegramPlatform.isTelegramPlatform() ? 'pt-[100px]' : 'pt-[248px]'
      }`}>
      <Image src={require('assets/images/loading-title.png')} alt="" className="mx-auto h-[400px] w-[400px]"></Image>
      <Image src={require('assets/images/game-coming.png')} alt="" className="mx-auto w-[570px]"></Image>
      <Animation></Animation>
    </div>
  );
}
