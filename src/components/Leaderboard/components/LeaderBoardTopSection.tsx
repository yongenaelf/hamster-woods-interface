import useGetState from 'redux/state/useGetState';

interface ILeaderBoardTopSection extends React.PropsWithChildren {
  onClick?: () => void;
}
export const LeaderBoardTopSection = ({ children, onClick }: ILeaderBoardTopSection) => {
  const { isMobile, imageResources } = useGetState();

  return (
    <div onClick={onClick} className={`pb-0 text-left ${isMobile ? 'text-[12px]' : 'text-xl'}`}>
      {children ? (
        <div className="flex">
          {/* <img src={imageResources?.infoIcon} className="w-4 h-4 mt-1" /> */}
          <span>{children}</span>
        </div>
      ) : null}
    </div>
  );
};
