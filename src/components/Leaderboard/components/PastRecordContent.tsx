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
  }, [selectedSeason]);

  return (
    <div className="w-full flex-grow bg-blue-400 rounded-2xl shadow-inner p-2 mb-2 flex flex-col">
      <div className="w-full bg-blue-700 shadow-inner rounded-tl-2xl rounded-tr-2xl flex flex-row mb-[1px] items-center justify-between p-4">
        <select
          className={['bg-blue-700 font-roboto text-white', isMobile ? 'p-2.5 text-lg' : 'p-2 text-3xl'].join(' ')}
          onChange={(e) => setSelectedSeason(e.target.value)}>
          {data?.Season.map((i) => (
            <option key={i.id} value={i.id}>
              {i.id}
            </option>
          ))}
        </select>
        <div
          className={['text-white text-opacity-60 font-normal leading-none', isMobile ? 'text-lg' : 'text-3xl'].join(
            ' ',
          )}>
          {dateString}
        </div>
      </div>
      <div
        className={[
          'w-full bg-blue-700 shadow-inner rounded-bl-2xl rounded-br-2xl flex-grow h-1 p-4',
          isMobile ? 'text-md' : 'text-3xl',
        ].join(' ')}>
        <div className="flex py-8">
          <div className="flex-1">
            <div className="text-white text-opacity-60 font-normal leading-none mb-2">Points</div>
            <div
              className={['text-white text-3xl font-bold leading-tight', isMobile ? 'text-3xl' : 'text-5xl'].join(' ')}>
              {his?.season.Score || '-'}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-white text-opacity-60 font-normal leading-none mb-2">Ranking</div>
            <div
              className={['text-white text-3xl font-bold leading-tight', isMobile ? 'text-3xl' : 'text-5xl'].join(' ')}>
              {his?.season.rank || '-'}
            </div>
          </div>
        </div>
        <table className="w-full text-white">
          <thead className="bg-white bg-opacity-40 text-white text-opacity-70">
            <tr>
              <th className="text-left p-4 w-1/2">Time</th>
              <th className="text-left py-4">Points</th>
              <th className="text-right p-4">Ranking</th>
            </tr>
          </thead>
          <tbody>
            {his?.weeks.map((i, idx) => (
              <tr key={idx} className="border-b border-white border-opacity-40">
                <td className="p-4">Week {idx + 1}</td>
                <td className="py-4">{i.Score || <div className="text-white text-opacity-60">Not in</div>}</td>
                <td className="p-4 text-right">{i.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
