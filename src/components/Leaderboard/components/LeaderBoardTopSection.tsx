import useGetState from 'redux/state/useGetState';

interface ILeaderBoardTopSection extends React.PropsWithChildren {
  onClick?: () => void;
}
export const LeaderBoardTopSection = ({ children, onClick }: ILeaderBoardTopSection) => {
  const { isMobile, imageResources } = useGetState();

  return (
    <div
      onClick={onClick}
      className={`rounded-tl-2xl rounded-tr-2xl bg-blue-700 pb-0 shadow-inner text-left ${
        isMobile ? 'text-[12px] p-[8px]' : 'text-xl p-[18px]'
      }`}>
      {children ? (
        <div className="flex">
          {/* <img src={imageResources?.infoIcon} className="w-4 h-4 mt-1" /> */}
          <span className="text-white opacity-60 ml-2">{children}</span>
        </div>
      ) : null}
    </div>
  );
};
