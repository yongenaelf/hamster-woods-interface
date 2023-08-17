import { useLottie } from 'lottie-react';
import LoadingAnimation from 'assets/images/loading-animation.json';
import Image from 'next/image';

export default function LoadingAni() {
  const Animation = () => {
    const options = {
      animationData: LoadingAnimation,
      loop: true,
      autoplay: true,
    };

    const { View } = useLottie(options, { margin: '0 auto' });

    return View;
  };

  return (
    <div className="h-[100vh] w-full bg-[#2D20E1] pt-[199px]">
      <Image src={require('assets/images/loading-title.png')} alt="" className="mx-auto h-[129px] w-[270px]"></Image>
      <Image src={require('assets/images/game-coming.png')} alt="" className="mx-auto mt-[75px] w-[257px]"></Image>
      <Animation></Animation>
    </div>
  );
}
