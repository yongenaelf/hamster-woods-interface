import { randomId, sleep } from '@portkey/utils';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';
import { useCallback, useEffect, useState } from 'react';
import signalR, { POINT_LIST_CHANGE } from 'socket';

const targetClientId = randomId();

export type TPointItem = {
  behavior: string;
  pointAmount: number;
  pointName: string;
};

export const usePoints = () => {
  const address = useAddressWithPrefixSuffix();
  const [pointsList, setPointsList] = useState<TPointItem[]>([]);

  const initSocket = useCallback(async () => {
    if (!signalR) return;

    try {
      await signalR.doOpen({
        url: '/api/app/fluxPoints',
        clientId: targetClientId,
      });

      await signalR.listen(POINT_LIST_CHANGE, (data) => {
        console.log('pointsListChange', data);
        setPointsList(data?.body || []);
      });

      await signalR.invoke('pointsList', { caAddress: address, targetClientId: targetClientId });

      return signalR;
    } catch (error) {
      console.log('socket err', error);
      return signalR;
    }
  }, [address]);

  return { signalR, initSocket, pointsList };
};
