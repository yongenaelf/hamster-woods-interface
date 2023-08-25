import type { Meta, StoryObj } from '@storybook/react';
import { Leaderboard } from '../components/Leaderboard';
import { toggleShowLeaderboard } from '../redux/reducer/info';
import { useWeeklyRank } from '../components/Leaderboard/data/useWeeklyRank';
import { useEffect } from 'react';
import { storybookStore } from '../../.storybook/preview';

const meta: Meta<typeof Leaderboard> = {
  title: 'BeangoTown/Leaderboard',
  component: Leaderboard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        storybookStore.dispatch(toggleShowLeaderboard());
      }, []);

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

export const Weekly: Story = {
  args: {
    records: 1,
    rank: 1,
    unranked: false,
  },
  argTypes: {
    records: {
      control: { type: 'range', min: 0, max: 99, step: 1 },
    },
    rank: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
    },
  },
  decorators: [
    (Story, context) => {
      const { rank, records, unranked } = context.args as { rank: number; records: number; unranked: boolean };
      const { mutate } = useWeeklyRank();

      useEffect(() => {
        mutate(
          {
            status: 1,
            refreshTime: '2023-08-29T01:00:00',
            rankingList: Array(records)
              .fill('')
              .map((_i, j) => ({
                rank: j + 1,
                score: 358,
                caAddress: 'ELF_2wLEEDc7wcAP2YmZRJ4RK8uZB7GLDkSDK8jhF74iN46ufmGe6Y_tDVW',
              })),
            selfRank: {
              rank: unranked ? -1 : rank,
              score: unranked ? 0 : 358,
              caAddress: 'ELF_2wLEEDc7wcAP2YmZRJ4RK8uZB7GLDkSDK8jhF74iN46ufmGe6Y_tDVW',
            },
          },
          false,
        );
      }, [records, rank]);

      return <Story />;
    },
  ],
};
