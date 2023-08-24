import { useIsMobile } from 'redux/selector/mobile';
import { useConditionalRank } from '../hooks/useConditionalRank';

interface IRank {
  rank?: number;
}
export const Rank = ({ rank }: IRank) => {
  const isMobile = useIsMobile();

  const textClassName = `bg-white text-center font-fonarto font-bold ${
    isMobile ? 'mx-1 py-1 px-3 rounded-full text-md' : 'text-lg'
  }`;

  const wrapperClassName = useConditionalRank({
    rank,
    first: '',
    second: '',
    third: '',
    ranked: `text-[#0538C9] ${textClassName}`,
    unranked: `text-[#0538C9] ${textClassName}`,
    missing: `text-neutral-400 ${textClassName}`,
  });

  const imgClassName = `${isMobile ? 'h-8' : 'h-16'}`;

  const el = useConditionalRank({
    rank,
    first: <img src={require('assets/images/gold.png').default.src} alt="gold" className={imgClassName} />,
    second: <img src={require('assets/images/silver.png').default.src} alt="silver" className={imgClassName} />,
    third: <img src={require('assets/images/bronze.png').default.src} alt="bronze" className={imgClassName} />,
    ranked: rank,
    unranked: '99+',
    missing: <>&mdash;</>,
  });

  return <div className={`${wrapperClassName}`}>{el}</div>;
};
