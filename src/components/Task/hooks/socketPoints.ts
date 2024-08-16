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
  const listenerRef = useRef<IListen>();
  const initSocket = useCallback(async () => {
    if (!signalR) return;

    try {
      await signalR.doOpen({
        url: '/api/app/fluxPoints',
        clientId: targetClientId,
      });
      listenerRef.current = await signalR.listen(POINT_LIST_CHANGE, (data) => {
        console.log('pointsListChange', data);
        setPointsList(data?.body || []);
      });
      await signalR.invoke('pointsList', { caAddress: address, targetClientId: targetClientId });
    } catch (error) {
      console.log('Connection socket err', error);
    }
  }, [address]);
  const disconnect = useCallback(async () => {
    listenerRef.current?.remove();
    signalR.signalr?.off(POINT_LIST_CHANGE);
    await signalR.stop();
    console.log('Connection stop');
  }, []);
  return { signalR, initSocket, pointsList, disconnect };
};
