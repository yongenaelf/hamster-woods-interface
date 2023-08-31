import { useIsMobile } from 'redux/selector/mobile';

export const LeaderBoardNoRecord = ({ children }: React.PropsWithChildren) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-grow items-center justify-center bg-blue-700 rounded-bl-xl rounded-br-xl">
      <div className={`${isMobile ? 'px-8' : 'px-32'}`}>
        <img src={require('assets/images/no-record.png').default.src} alt="No Record" className={`mx-auto w-32 mb-8`} />
        <div className={`text-center font-roboto text-[#89A5F5] ${isMobile ? 'text-lg' : 'text-2xl'}`}>{children}</div>
      </div>
    </div>
  );
};
