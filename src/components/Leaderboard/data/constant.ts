import GoldIcon from 'assets/images/gold.png';
import SilverIcon from 'assets/images/silver.png';
import BronzeIcon from 'assets/images/bronze.png';
import Prize1 from 'assets/images/prize-1.png';
import Prize2 from 'assets/images/prize-2.png';
import Prize3 from 'assets/images/prize-3.png';

export const WeeklyPrizeTip = [
  `Hop & Win is a weekly challenge in Hamster Woods that rewards top hamsters and their masters (players) with NFT prizes!`,
  `Your weekly score is the total number of $ACORNS collected by your hamster from Tuesday to Sunday each week, updated in real-time until the challenge ends. The weekly ranking will be finalised at 00:00 (UTC) on MM:DD, and the top 20 players can claim their NFT prizes shortly after.`,
  `In the event of a tie, the hamster that reaches the tied amount of $ACORNS first will be declared the winner.`,
];

export enum RankEnum {
  First = 1,
  Second = 2,
  Third = 3,
}

export const RankItemDetail = {
  [RankEnum.First]: {
    rankIcon: GoldIcon,
    bgClassName: 'bg-[#F5BF49]',
    shadowInsetColor: '#DE7B3D',
    prizeDetail: 'KINGHAMSTER NFT Prize *1',
    avatarIcon: Prize1,
  },
  [RankEnum.Second]: {
    rankIcon: SilverIcon,
    bgClassName: 'bg-[#CEDFF7]',
    shadowInsetColor: '#B8B8EB',
    prizeDetail: 'KINGHAMSTER NFT Prize *1',
    avatarIcon: Prize2,
  },
  [RankEnum.Third]: {
    rankIcon: BronzeIcon,
    bgClassName: 'bg-[#E97D3C]',
    shadowInsetColor: '#B5412C',
    prizeDetail: 'KINGHAMSTER NFT Prize *1',
    avatarIcon: Prize3,
  },
};

export enum LeaderboardTextColors {
  Gold = 'text-white',
  Silver = 'text-white',
  Bronze = 'text-white',
  Blue = 'text-leaderboard-blue',
  White = 'text-white',
  Brown = 'text-[#AE694C]',
}
