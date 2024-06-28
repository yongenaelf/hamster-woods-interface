import { useEffect, useMemo, useState } from 'react';
import { useRankingSeasonList } from '../data/useRankingSeasonList';
import { useRankingHistory } from '../data/useRankingHistory';
import { useIsMobile } from 'redux/selector/mobile';
import { getDateFormat } from 'utils/getDateFormat';
import { IRankingHistoryResult } from '../data/types';

const formatDate = (dateStr: string) => getDateFormat(dateStr, 'yyyy.M.d');

export const PastRecordContent = () => {
  const { data } = useRankingSeasonList();
  const [selectedSeason, setSelectedSeason] = useState('');
  const { data: his } = useRankingHistory(selectedSeason);
  const isMobile = useIsMobile();

  useEffect(() => {
    const selected = data?.season?.[0];
    if (selected) setSelectedSeason(selected.id);
  }, [data]);

  const dateString = useMemo(() => {
    const selected = data?.season.find((i) => i.id === selectedSeason);

    if (selected) return `${formatDate(selected.rankBeginTime)} - ${formatDate(selected.rankEndTime)}`;

    return '-';
  }, [selectedSeason, data]);

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
      <thead className="h-[36px] bg-[#DEC49D] text-[#AE694C] rounded-[5px] text-[16px]">
        <tr>
          <th className={`pl-[16px] text-left`}>Time</th>
          <th className={`text-left`}>ACORNS</th>
          <th className={`pr-[16px] text-right`}>Rank</th>
        </tr>
      </thead>
      <tbody>
        {his?.weeks.map((i, idx) => (
          <tr key={idx} className="border-b border-[#D3B68A] border-opacity-40">
            <td className={`${isMobile ? 'p-2' : 'p-4'}`}>Week-{i.week}</td>
            <td className={`${isMobile ? 'py-2' : 'py-4'}`}>
              {i.score ?? <div className="text-white text-opacity-60">N/A</div>}
            </td>
            <td className={`${isMobile ? 'p-2' : 'p-4'} text-right`}>{i.rank === -1 ? '-' : i.rank}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
