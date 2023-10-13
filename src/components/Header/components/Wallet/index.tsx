import { getBeanPassClaimClaimable } from 'api/request';
import { useAddress } from 'hooks/useAddress';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import useGetState from 'redux/state/useGetState';
import showMessage from 'utils/setGlobalComponentsInfo';

export default function Wallet() {
  const { isMobile } = useGetState();

  const router = useRouter();

  const address = useAddress();

  const checkAccountInitStatus = useCallback(async () => {
    showMessage.loading();
    let checkAccountInitStatusRes;
    try {
      checkAccountInitStatusRes = await getBeanPassClaimClaimable({
        caAddress: address,
      });
      console.log('checkAccountInitStatus', checkAccountInitStatusRes);
      showMessage.hideLoading();
    } catch (err) {
      showMessage.hideLoading();
      console.log('checkBeanPassStatusError:', err);
      return true;
    }
    if (!checkAccountInitStatusRes) return false;
    return true;
  }, [address]);

  const handleAsset = async () => {
    const isAbleInit = await checkAccountInitStatus();
    isAbleInit && router.push('/asset');
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
