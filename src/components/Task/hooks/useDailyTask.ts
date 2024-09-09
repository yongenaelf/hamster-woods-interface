import useSWR from 'swr';
import { getDailyTask } from 'api/request';
import { Item, TaskType } from '../components/TaskItem';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useDailyTask = () => {
  const address = useAddressWithPrefixSuffix();

  return useSWR(
    ['getDailyTask', address],
    async () => {
      if (!address) return;
      const dailyTaskData = await getDailyTask({
        caAddress: address,
      });

      if (dailyTaskData) {
        const transformData: Item[] = dailyTaskData.map((item, index) => {
          return {
            id: index,
            type: TaskType.Daily_Hop,
            icon: item.imageUrl,
            title: item.isOverHop
              ? `Take over 15 HOPs in the game`
              : `Take ${item.hopCount}/${item.currentHopCount} HOPs in the game`,
            pointAmount: item.pointAmount,
            pointName: item.pointName,
            isComplete: item.isComplete,
          };
        });

        return {
          title: 'Weekly Tasks',
          list: transformData,
        };
      } else return undefined;
    },
    {
      dedupingInterval: 0,
    },
  );
};
