import GoldIcon from 'assets/images/gold.png';
import SilverIcon from 'assets/images/silver.png';
import BronzeIcon from 'assets/images/bronze.png';
import KingHamster from 'assets/images/king-hamster.png';

export const WeeklyPrizeTip = [
  `Hop & Win is a weekly challenge in Hamster Woods that rewards top hamsters and their masters (players) with NFT prizes!`,
  `Your weekly score is the total number of $ACORNS collected by your hamster from Monday to Sunday each week, updated in real-time until the challenge ends. The weekly ranking will be finalised at 00:00 (UTC) next Monday, and the top 10 players can claim their NFT prizes shortly after.`,
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
    bgClassName: 'bg-[#F3B328]',
    shadowInsetColor: '#DE7B3D',
    prizeDetail: 'KINGHAMSTER NFT Prize *3',
    avatarIcon: KingHamster,
  },
  [RankEnum.Second]: {
    rankIcon: SilverIcon,
    bgClassName: 'bg-[#A0B1CB]',
    shadowInsetColor: '#B8B8EB',
    prizeDetail: 'KINGHAMSTER NFT Prize *2',
    avatarIcon: KingHamster,
  },
  [RankEnum.Third]: {
    rankIcon: BronzeIcon,
    bgClassName: 'bg-[#D77D3C]',
    shadowInsetColor: '#B5412C',
    prizeDetail: 'KINGHAMSTER NFT Prize *2',
    avatarIcon: KingHamster,
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
