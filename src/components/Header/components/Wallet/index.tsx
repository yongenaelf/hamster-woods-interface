import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useGetState from 'redux/state/useGetState';

export default function Wallet() {
  const { isMobile } = useGetState();

  const router = useRouter();
  const handleAsset = () => {
    router.push('/asset');
  };

  return (
    <>
      <Image
        src={require('assets/images/header-wallet.png')}
        alt=""
        className={`object-cover ${isMobile ? 'h-10 w-10' : 'h-20 w-20'}`}
        onClick={handleAsset}
      />
    </>
  );
}
