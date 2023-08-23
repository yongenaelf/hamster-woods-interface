import { useIsMobile } from 'redux/selector/mobile';
import { useConditionalRank } from '../hooks/useConditionalRank';

interface IRank {
  rank?: number;
}
export const Rank = ({ rank }: IRank) => {
  const isMobile = useIsMobile();

  const wrapperClassName = useConditionalRank({
    rank,
    first: '',
    second: '',
    third: '',
    ranked: 'bg-white text-[#0538C9]',
    unranked: 'bg-white text-[#0538C9]',
    missing: 'bg-white text-neutral-400',
  });

  const el = useConditionalRank({
    rank,
    first: <img src={require('assets/images/gold.png').default.src} alt="gold" />,
    second: <img src={require('assets/images/silver.png').default.src} alt="silver" />,
    third: <img src={require('assets/images/bronze.png').default.src} alt="bronze" />,
    ranked: rank,
    unranked: '99+',
    missing: <>&mdash;</>,
  });

  return (
    <div
      className={`${wrapperClassName} ml-2 w-16 rounded-3xl p-2 text-center font-fonarto font-bold ${
        isMobile ? 'mr-3 text-2xl' : 'mr-4 text-3xl'
      }`}>
      {el}
    </div>
  );
};
