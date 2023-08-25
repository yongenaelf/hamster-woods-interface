import type { Meta, StoryObj } from '@storybook/react';
import { Leaderboard } from '../components/Leaderboard';
import { toggleShowLeaderboard } from '../redux/reducer/info';
import { useWeeklyRank } from '../components/Leaderboard/data/useWeeklyRank';
import { useEffect } from 'react';
import { storybookStore } from '../../.storybook/preview';
import { useSeasonRank } from '../components/Leaderboard/data/useSeasonRank';
import { add } from 'date-fns';

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
        if (!storybookStore.getState().info.showLeaderboard) storybookStore.dispatch(toggleShowLeaderboard());
      }, []);

      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Leaderboard>;

export const WithData: Story = {
  args: {
    records: 1,
    rank: 1,
    unranked: false,
    status: 0,
  },
  argTypes: {
    records: {
      control: { type: 'range', min: 0, max: 99, step: 1 },
    },
    rank: {
      control: { type: 'range', min: 1, max: 100, step: 1 },
    },
    status: {
      control: { type: 'range', min: 0, max: 2, step: 1 },
    },
  },
  decorators: [
    (Story, context) => {
      const { rank, records, unranked, status } = context.args as {
        rank: number;
        records: number;
        unranked: boolean;
        status: number;
      };
      const { mutate: weekly } = useWeeklyRank();
      const { mutate: season } = useSeasonRank();

      useEffect(() => {
        weekly(
          {
            status,
            refreshTime:
              status === 1
                ? add(new Date(), {
                    weeks: 1,
                  }).toISOString()
                : null,
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
        season(
          {
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
      }, [records, rank, unranked, status]);

      return <Story />;
    },
  ],
};
