import { useTask } from '../hooks/useTask';
import { Item } from './TaskItem';
import { TaskItemList } from './TaskItemList';
export interface ITaskContentProps {
  onItemClick?: (item: Item) => void;
}
export const TaskTabContent = (props: ITaskContentProps) => {
  const { data } = useTask();
  return <TaskItemList data={data?.result} onItemClick={props.onItemClick} />;
};
