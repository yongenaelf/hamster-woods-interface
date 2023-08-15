import { useIsMobile } from 'redux/selector/mobile';

interface IRank {
  rank?: number | string;
  /**
   * Whether to show inverted colors (white background)
   */
  invert?: boolean;
}

export const Rank = ({ rank, invert }: IRank) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`ml-2 w-16 rounded-3xl p-2 text-center font-paytone font-bold ${
        isMobile ? 'mr-3 text-2xl' : 'mr-4 text-3xl'
      } ${invert ? 'bg-white text-[#0538C9]' : 'bg-[#4F6C9B] text-white'}`}>
      {rank ?? '-'}
    </div>
  );
};
