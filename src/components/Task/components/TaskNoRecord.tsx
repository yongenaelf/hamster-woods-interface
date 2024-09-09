import { useIsMobile } from 'redux/selector/mobile';

export const TaskNoRecord = ({ children }: React.PropsWithChildren) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-grow items-center justify-center rounded-bl-xl rounded-br-xl">
      <div className={`${isMobile ? 'px-8' : 'px-32'}`}>
        <img src={require('assets/images/no-record.png').default.src} alt="No Record" className={`mx-auto w-32 mb-8`} />
        <div className={`text-center font-roboto font-medium ${isMobile ? 'text-lg' : 'text-2xl'}`}>{children}</div>
      </div>
    </div>
  );
};
