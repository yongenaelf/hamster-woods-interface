import { useIsMobile } from 'redux/selector/mobile';

export const LeaderBoardNormalItem = ({
  rank = 4,
  address = '-',
  beans = 0,
}: {
  rank: number;
  address: string;
  beans: number;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`mb-2 flex w-full items-center rounded-3xl border border-[#003658] bg-[#81A2D7] p-1 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12),0px_-3px_0px_0px_#6D8EC3_inset] shadow-inner ${
        isMobile ? 'h-20' : 'h-28'
      }`}>
      <div
        className={`ml-2 rounded-3xl bg-[#4F6C9B] p-2 text-center font-paytone font-bold text-white ${
          isMobile ? 'mr-3 w-16 text-2xl' : 'mr-4 w-24 text-4xl'
        }`}>
        {rank}
      </div>
      <div className={`ml-2 flex-grow font-roboto font-bold text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>
        {address}
      </div>
      <div className={`font-roboto font-bold text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>
        {beans.toLocaleString()}
      </div>
      <img
        className={isMobile ? 'mx-3 h-8' : 'mx-8 h-16'}
        src={require('assets/images/bean.png').default.src}
        alt="bean"
      />
    </div>
  );
};
