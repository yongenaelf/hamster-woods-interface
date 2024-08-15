import ContractRequest from 'contract/contractRequest';
import { useCallback } from 'react';
import { useAddress } from './useAddress';

export function useBalance(): (symbol: string) => Promise<number | undefined> {
  const address = useAddress();
  const contract = ContractRequest.get();
  return useCallback(
    async (symbol: string) => {
      let balance;
      try {
        if (!address) throw 'can not get user address';

        const res = await contract.getBalance({ symbol, owner: address });
        balance = res.balance;
        return res.balance;
      } catch (error) {
        console.log('===useBalance error', error);
      }
      return balance;
    },
    [address, contract],
  );
}
