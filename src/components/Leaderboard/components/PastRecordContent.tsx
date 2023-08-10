import { useEffect, useMemo, useState } from 'react';
import { useRankingSeasonList } from '../data/useRankingSeasonList';
import { useRankingSeasonHis } from '../data/useRankingSeasonHis';
import { useIsMobile } from 'redux/selector/mobile';

export const PastRecordContent = () => {
  const { data } = useRankingSeasonList();
  const [selectedSeason, setSelectedSeason] = useState('');
  const { data: his } = useRankingSeasonHis(selectedSeason, 'id');
  const isMobile = useIsMobile();

  useEffect(() => {
    const selected = data?.Season?.[0];
    if (selected) setSelectedSeason(selected.id);
  }, [data]);

  const dateString = useMemo(() => {
    const selected = data?.Season.find((i) => i.id === selectedSeason);
    if (selected) return `${selected.beginTime} - ${selected.endTime}`;

    return '-';
  }, [selectedSeason, data]);

  return (
    <div className="mb-2 flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 shadow-inner">
      <div className="mb-[1px] flex w-full flex-row items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 shadow-inner">
        <select
          className={`bg-blue-700 font-roboto text-white ${isMobile ? 'p-2.5 text-lg' : 'p-2 text-3xl'}`}
          onChange={(e) => setSelectedSeason(e.target.value)}>
          {data?.Season.map((i) => (
            <option key={i.id} value={i.id}>
              {i.id}
            </option>
          ))}
        </select>
        <div className={`font-normal leading-none text-white text-opacity-60 ${isMobile ? 'text-lg' : 'text-3xl'}`}>
          {dateString}
        </div>
      </div>
      <div
        className={`h-1 w-full flex-grow rounded-bl-2xl rounded-br-2xl bg-blue-700 p-4 shadow-inner ${
          isMobile ? 'text-md' : 'text-3xl'
        }`}>
        <div className="flex py-8">
          <div className="flex-1">
            <div className="mb-2 font-normal leading-none text-white text-opacity-60">Points</div>
            <div className={`text-3xl font-bold leading-tight text-white ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              {his?.season.score || '-'}
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2 font-normal leading-none text-white text-opacity-60">Ranking</div>
            <div className={`text-3xl font-bold leading-tight text-white ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
              {his?.season.rank || '-'}
            </div>
          </div>
        </div>
        <table className="w-full text-white">
          <thead className="bg-white bg-opacity-40 text-white text-opacity-70">
            <tr>
              <th className="w-1/2 p-4 text-left">Time</th>
              <th className="py-4 text-left">Points</th>
              <th className="p-4 text-right">Ranking</th>
            </tr>
          </thead>
          <tbody>
            {his?.weeks.map((i, idx) => (
              <tr key={idx} className="border-b border-white border-opacity-40">
                <td className="p-4">Week {idx + 1}</td>
                <td className="py-4">{i.score || <div className="text-white text-opacity-60">Not in</div>}</td>
                <td className="p-4 text-right">{i.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
