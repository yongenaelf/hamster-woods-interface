import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowLeaderboardInfo } from 'redux/reducer/info';
import { LeaderboardTextColors } from './LeaderBoardItemText';
import LeaderBoardModal from './LeaderBoardModal';
import { IReward } from 'types';

const AElfLogo = () => {
  const isMobile = useIsMobile();

  return (
    <img className={`p-2 ${isMobile ? 'h-10' : 'h-16'}`} src={require('assets/images/elf.png').default.src} alt="elf" />
  );
};

interface INormalItem {
  leftText: string;
  reward: number;
}
const NormalItem = ({ leftText, reward }: INormalItem) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`${
        isMobile ? 'h-10' : 'h-16'
      } mb-2 flex w-full items-center rounded-3xl border border-[#003658] bg-[#81A2D7] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12),0px_-3px_0px_0px_#6D8EC3_inset]`}>
      <div
        className={`${
          isMobile ? 'px-4' : 'text-lg px-4 py-2'
        } bg-[#4F6C9B] text-white text-bold font-fonarto rounded-full ml-2`}>
        {leftText}
      </div>
      <div className="flex-grow"></div>
      <div className={`${isMobile ? 'w-[7rem] justify-between mr-4' : 'w-[13rem]'} h-full flex items-center`}>
        <AElfLogo />
        <span className={`${isMobile ? '' : 'text-2xl'} text-white text-bold`}>{reward} ELF</span>
      </div>
    </div>
  );
};

interface IRankedItem {
  bgClassName: string;
  shadowInsetColor: string;
  src: string;
  reward: number;
  textClassName: string;
}
const RankedItem = ({ bgClassName, shadowInsetColor, src, reward, textClassName }: IRankedItem) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative mb-2 flex w-full items-center rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute before:bg-white before:bg-opacity-30 ${
        isMobile
          ? 'h-12 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-20 before:h-8 before:left-1 before:right-1 before:top-1 before:rounded-2xl'
      } ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <img className="h-full" src={src} alt="rank" />
      <span className="flex-grow"></span>
      <div className={`h-full flex items-center ${isMobile ? 'w-[7rem] justify-between mr-3' : 'w-[13rem]'}`}>
        <AElfLogo />
        <span className={`${textClassName} ${isMobile ? 'text-lg' : 'text-4xl'} text-bold font-fonarto`}>
          {reward} ELF
        </span>
      </div>
    </div>
  );
};

interface ILeaderBoardInfoModal extends React.PropsWithChildren {
  data?: IReward[];
}

export const LeaderBoardInfoModal = ({ children, data }: ILeaderBoardInfoModal) => {
  const open = useSelector((state) => state.info.showLeaderboardInfo);
  const isMobile = useIsMobile();

  if (!data) return null;

  const firstItem = data.find((i) => i.text === '1');
  const secondItem = data.find((i) => i.text === '2');
  const thirdItem = data.find((i) => i.text === '3');
  const unrankedItems = data.filter((i) => !['1', '2', '3'].includes(i.text));

  return (
    <LeaderBoardModal
      title="Leader Board"
      className="text-left"
      open={open}
      onCancel={() => dispatch(toggleShowLeaderboardInfo())}>
      <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 shadow-inner">
        <div className="rounded-2xl bg-blue-700 p-4 shadow-inner h-full">
          <div className={`${isMobile ? 'text-md' : 'text-lg'} text-white text-left mb-4`}>{children}</div>
          {firstItem ? (
            <RankedItem
              bgClassName="bg-[#F5BF49]"
              shadowInsetColor="#DE7B3D"
              src={require('assets/images/gold.png').default.src}
              reward={firstItem.reward}
              textClassName={LeaderboardTextColors.Gold}
            />
          ) : null}
          {secondItem ? (
            <RankedItem
              bgClassName="bg-[#CEDFF7]"
              shadowInsetColor="#B8B8EB"
              src={require('assets/images/silver.png').default.src}
              reward={secondItem.reward}
              textClassName={LeaderboardTextColors.Silver}
            />
          ) : null}
          {thirdItem ? (
            <RankedItem
              bgClassName="bg-[#E97D3C]"
              shadowInsetColor="#B5412C"
              src={require('assets/images/bronze.png').default.src}
              reward={thirdItem.reward}
              textClassName={LeaderboardTextColors.Bronze}
            />
          ) : null}
          {unrankedItems.map((i) => (
            <NormalItem key={i.text} leftText={`Top ${i.text}`} reward={i.reward} />
          ))}
        </div>
      </div>
    </LeaderBoardModal>
  );
};

export default LeaderBoardInfoModal;
