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
        <div className="flex">
          <img src={require('assets/images/info-icon.png').default.src} className="w-4 h-4 mt-1" />
          <span className="text-white opacity-60 ml-2">{children}</span>
        </div>
      ) : null}
    </div>
  );
};
