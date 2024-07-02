import { useState } from 'react';
import { useRankingSeasonList } from '../data/useRankingSeasonList';
import { useRankingHistory } from '../data/useRankingHistory';
import { useIsMobile } from 'redux/selector/mobile';
import { IRankingHistoryResult } from '../data/types';

const mockData = [
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: {
      symbol: 'xxx-1',
      chainId: 'tDVW',
      tokenName: 'TTZZ',
      imageUrl: 'xxx',
      balance: 1,
    },
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: null,
  },
  {
    time: '2024-Week 1-01290202',
    caAddress: 'xxx',
    score: 100,
    rank: 1,
    rewardNftInfo: null,
  },
];

export const PastRecordContent = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const { data } = useRankingHistory(selectedSeason);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col overflow-hidden space-x-[8px] bg-[#E8D1AE] rounded-[8px] flex-1">
      <div className="flex text-[16px] leading-[18px] text-[#AE694C] bg-[#DEC49D] px-[16px] py-[9px] text-left rounded-[5px]">
        <div className="flex-1">Time</div>
        <div className="flex-none w-[140px]">$ACORNS</div>
        <div className="flex-1">Rank</div>
      </div>
      <div className="overflow-y-auto h-full">
        {mockData.map((item, i) => (
          <div
            key={i}
            className="flex text-[16px] leading-[18px] text-[#953D22] p-4 text-left border-b-[1px] border-[#D3B68A]">
            <div className="flex-1">{item.time}</div>
            <div className="flex-none w-[140px]">{item.score.toLocaleString() ?? 'N/A'}</div>
            <div className="flex-1 flex justify-between items-center">
              <span>{item.rank === -1 ? '-' : item.rank.toLocaleString()}</span>
              {item.rewardNftInfo && (
                <div
                  className={`font-black text-white bg-[#A15A1C] text-center rounded-[6px] ${
                    isMobile ? 'px-1 py-[3px] text-[10px] leading-[10px]' : 'px-2 py-[5px] text-xs leading-[22px]'
                  }`}>
                  Claim NFT Rewards
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
