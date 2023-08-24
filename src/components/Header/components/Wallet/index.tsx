import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Wallet() {
  const router = useRouter();
  const handleAsset = () => {
    router.push('/asset');
  };

  return (
    <>
      <Image
        src={require('assets/images/header-wallet.png')}
        alt=""
        className="h-10 w-10 object-cover"
        onClick={handleAsset}
      />
    </>
  );
}
