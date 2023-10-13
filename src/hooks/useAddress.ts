import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectInfo } from 'redux/reducer/info';
import { WalletType } from 'types';

export function useAddress() {
  const [address, setAddress] = useState<string>('');
  const { walletType, walletInfo } = useSelector(selectInfo);
  useEffect(() => {
    if (walletType === WalletType.discover) {
      setAddress(walletInfo?.discoverInfo?.address || '');
    } else if (walletType === WalletType.portkey) {
      setAddress(walletInfo?.portkeyInfo?.caInfo.caAddress || '');
    }
  }, [walletInfo, walletType]);

  return address;
}
