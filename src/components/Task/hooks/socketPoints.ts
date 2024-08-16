import { randomId } from '@portkey/utils';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';
import { useCallback, useRef, useState } from 'react';
import signalR, { POINT_LIST_CHANGE } from 'socket';
import { IListen } from '@portkey/socket';

const targetClientId = randomId();

export type TPointItem = {
  behavior: string;
  pointAmount: number;
  pointName: string;
};

export const usePoints = () => {
  const address = useAddressWithPrefixSuffix();
  const [pointsList, setPointsList] = useState<TPointItem[]>([]);
  const removeRef = useRef<IListen>();
  const initSocket = useCallback(async () => {
    if (!signalR) return;

    try {
      await signalR.doOpen({
        url: '/api/app/fluxPoints',
        clientId: targetClientId,
      });
    } catch (error) {
      console.log('Connection socket err', error);
    }
  }, []);
  const disconnect = useCallback(async () => {
    removeRef.current?.remove();
    await signalR.stop();
    console.log('Connection stop');
  }, []);
  const reconnect = useCallback(async () => {
    await signalR.start();
    removeRef.current = await signalR.listen(POINT_LIST_CHANGE, (data) => {
      console.log('pointsListChange', data);
      setPointsList(data?.body || []);
    });
    await signalR.invoke('pointsList', { caAddress: address, targetClientId: targetClientId });
    console.log('Connection started');
  }, [address]);
  return { signalR, initSocket, pointsList, disconnect, reconnect };
};
