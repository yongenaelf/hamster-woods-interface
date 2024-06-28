import { useState } from 'react';
import { useRankingSeasonList } from '../data/useRankingSeasonList';
import { useRankingHistory } from '../data/useRankingHistory';
import { useIsMobile } from 'redux/selector/mobile';
import { getDateFormat } from 'utils/getDateFormat';
import { IRankingHistoryResult } from '../data/types';

const formatDate = (dateStr: string) => getDateFormat(dateStr, 'yyyy.M.d');

const mockData = [
  {
    startDate: '',
    endDate: '',
    week: '1',
    score: '100',
    rank: 1,
    claimed: true,
  },
  {
    startDate: '',
    endDate: '',
    week: '2',
    score: '100',
    rank: 2,
    claimed: true,
  },
  {
    startDate: '',
    endDate: '',
    week: '3',
    score: '100',
    rank: -1,
    claimed: false,
  },
];

export const PastRecordContent = () => {
  const [selectedSeason, setSelectedSeason] = useState('');
  const { data: his } = useRankingHistory(selectedSeason);
  const isMobile = useIsMobile();

  return (
    <div className="mb-2 flex w-full flex-grow flex-col">
      <Table his={his} />
    </div>
  );
};

interface IData {
  his?: IRankingHistoryResult;
}

const Table = ({ his }: IData) => {
  const isMobile = useIsMobile();

  return (
    <table className={`${isMobile ? '' : 'text-lg'} w-full`}>
      <thead
        className={`h-[36px] bg-[#DEC49D] text-[#AE694C] rounded-[5px] text-left ${
          isMobile ? 'text-[12px]' : 'text-[16px]'
        }`}>
        <tr>
          <th className={`${isMobile ? 'px-2' : 'px-4'} `}>Time</th>
          <th>$ACORNS</th>
          <th className={`${isMobile ? 'px-2 text-center' : 'px-4'}`}>Rank</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((i, idx) => (
          <>
            <tr key={idx} className="border-b border-[#D3B68A] border-opacity-40">
              <td
                className={`${
                  isMobile ? 'p-2' : 'p-4'
                }`}>{`${i.startDate}-Week ${i.week}-${i.startDate}-${i.endDate}`}</td>
              <td className={`${isMobile ? 'py-2' : 'py-4'}`}>
                {i.score ?? <div className="text-white text-opacity-60">N/A</div>}
              </td>
              <td
                className={`${
                  isMobile ? 'p-2 flex flex-col justify-center' : 'p-4 flex justify-between items-center'
                }`}>
                <div className={isMobile ? 'text-center' : '"text-left"'}>{i.rank === -1 ? '-' : i.rank}</div>
                {i.claimed && (
                  <div
                    className={`font-black text-white bg-[#A15A1C] text-center rounded-[6px] ${
                      isMobile ? 'px-1 py-[3px] text-[10px] leading-[10px]' : 'px-2 py-[5px] text-xs leading-[22px]'
                    }`}>
                    Claim NFT Rewards
                  </div>
                )}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
