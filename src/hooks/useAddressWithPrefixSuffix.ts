import { useAddress } from './useAddress';
import { addPrefixSuffix } from 'utils/addressFormatting';

export function useAddressWithPrefixSuffix() {
  const address = useAddress();

  return addPrefixSuffix(address);
}
