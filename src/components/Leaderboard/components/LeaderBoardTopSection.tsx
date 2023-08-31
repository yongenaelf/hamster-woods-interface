import { useIsMobile } from 'redux/selector/mobile';

interface ILeaderBoardTopSection extends React.PropsWithChildren {
  onClick?: () => void;
}
export const LeaderBoardTopSection = ({ children, onClick }: ILeaderBoardTopSection) => {
  const isMobile = useIsMobile();

  return (
    <div
      onClick={onClick}
      className={`rounded-tl-2xl rounded-tr-2xl bg-blue-700 p-4 pb-0 shadow-inner text-left ${
        isMobile ? 'text-md' : 'text-xl'
      }`}>
      {children ? (
        <div>
          <span className="mr-2 inline-flex h-[1.2em] w-[1.2em] justify-center rounded-full bg-[#5197FF] font-fonarto text-white font-bold">
            i
          </span>
          <span className="text-white opacity-60">{children}</span>
        </div>
      ) : null}
    </div>
  );
};
