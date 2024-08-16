import useSWR from 'swr';
import { getDailyTask, getWeeklyTask } from 'api/request';
import { Item, TaskType } from '../components/TaskItem';
import { IData } from '../components/TaskItemList';
import { useAddressWithPrefixSuffix } from 'hooks/useAddressWithPrefixSuffix';

export const useTask = () => {
  const address = useAddressWithPrefixSuffix();

  return useSWR(
    ['getWeeklyTask', address],
    async () => {
      if (!address) return;
      const weeklyTaskData = await getWeeklyTask({
        caAddress: address,
      });
      const dailyTaskData = await getDailyTask({
        caAddress: address,
      });
      const result: IData[] = [];
      if (dailyTaskData) {
        const transformData: Item[] = dailyTaskData.map((item, index) => {
          return {
            id: index,
            type: TaskType.Daily_Hop,
            icon: item.imageUrl,
            title: item.isOverHop
              ? `Take over 15 HOPs in the game`
              : `Take ${item.isComplete ? item.hopCount : item.currentHopCount}/${item.hopCount} HOPs in the game`,
            pointAmount: item.pointAmount,
            pointName: item.pointName,
            isComplete: item.isComplete,
          };
        });

        result.push({
          id: 1,
          title: 'Daily Tasks',
          list: transformData,
        });
      }
      if (weeklyTaskData) {
        const transformData: Item[] = weeklyTaskData.map((item, index) => {
          return {
            id: index,
            type: TaskType.Weekly_Purchase,
            icon: item.imageUrl,
            title:
              item.fromCount === item.toCount
                ? `Purchase ${item.toCount} hopping chance`
                : `Purchase ${item.fromCount}-${item.toCount} hopping chances`,
            pointAmount: item.pointAmount,
            pointName: item.pointName,
            isComplete: item.isComplete,
          };
        });
        result.push({
          id: 2,
          title: 'Weekly Tasks',
          list: transformData,
        });
      }
      if (result.length > 0)
        return {
          result,
        };
      else return undefined;
    },
    {
      dedupingInterval: 0,
    },
  );
};
