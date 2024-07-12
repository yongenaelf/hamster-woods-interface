import { ModalProps } from 'antd';

import CustomModal, { ICustomModalProps } from 'components/CustomModal';
import { RankEnum, RankItemDetail, WeeklyPrizeTip } from '../data/constant';
import { useIsMobile } from 'redux/selector/mobile';

export interface IRankItemProps {
  rank: RankEnum;
}

export function RankItem({ rank }: IRankItemProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={`relative mb-3 flex w-full items-center rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute ${
        isMobile
          ? 'h-12 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-12 before:h-8 before:left-1 before:right-1 before:top-1 before:rounded-2xl'
      } ${RankItemDetail[rank].bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${RankItemDetail[rank].shadowInsetColor} inset`,
      }}>
      <img
        width={40}
        height={40}
        className={`z-10 w-[40px] h-[40px] ${isMobile ? '' : 'mx-2'}`}
        src={RankItemDetail[rank].rankIcon.src}
        alt="rank"
      />
      <span className="flex-grow"></span>
      <div className={`${isMobile ? 'text-[12px]' : 'text-xl '} leading-4 text-white font-paytone`}>
        {RankItemDetail[rank].prizeDetail}
      </div>
      <img
        src={RankItemDetail[rank].avatarIcon.src}
        className={`z-10 w-[30px] h-[30px] ${
          isMobile ? 'mx-2' : 'mx-4'
        } rounded-full   border-[3px] border-[#ffffff] border-solid`}
        width={30}
        height={30}
        alt="avatar"
      />
    </div>
  );
}

export interface IDefaultItemProps {
  topText: string;
  avatarIcon: string;
  getNFTDetail: string;
}

export function DefaultItem({ topText, avatarIcon, getNFTDetail }: IDefaultItemProps) {
  const isMobile = useIsMobile();
  return (
    <div className={`mb-3 h-12 flex w-full items-center border bg-[#DEC49D] rounded-full `}>
      <div className="flex-1 ml-2 my-2">
        <span
          className={`max-w-fit flex justify-center items-center px-[16px] py-[2px] bg-[#B26C27] rounded-full !h-[32px] ${
            isMobile ? 'text-[12px]' : 'text-[16px] '
          } leading-4  text-white font-paytone`}>
          {topText}
        </span>
      </div>
      <div className={`${isMobile ? 'text-[12px]' : 'text-xl '} leading-4 text-white font-paytone`}>{getNFTDetail}</div>
      <img
        src={avatarIcon}
        className={`rounded-full z-10 w-[30px] h-[30px] ${
          isMobile ? 'mx-2' : 'mx-4'
        }   border-[3px] border-[#ffffff] border-solid`}
        width={30}
        height={30}
        alt="avatar"
      />
    </div>
  );
}

export default function WeeklyPrizes(props: ICustomModalProps) {
  const { open, onCancel } = props;
  const isMobile = useIsMobile();
  return (
    <CustomModal
      className={isMobile ? '!w-[520px]' : '!w-[750px]'}
      open={open}
      centered
      onCancel={onCancel}
      title="Hop & Win Weekly Prizes">
      <div
        className={`${
          isMobile ? 'max-h-[70vh] h-[22rem]' : 'h-[41rem]'
        } text-[#AE694C] overflow-y-auto  [&::-webkit-scrollbar]:hidden`}>
        <div className="flex flex-col space-y-[10px] text-[16px] leading-[24px] text-left">
          {WeeklyPrizeTip.map((tip, index) => (
            <div key={`tip_${index}`} className={isMobile ? 'text-[12px] leading-[18px]' : ''}>
              {tip}
            </div>
          ))}
        </div>
        <div className="mt-[24px]">
          <RankItem rank={RankEnum.First} />
          <RankItem rank={RankEnum.Second} />
          <RankItem rank={RankEnum.Third} />
          <DefaultItem
            topText="Top 4-10"
            avatarIcon={require('assets/images/king-hamster.png').default.src}
            getNFTDetail="KINGHAMSTER NFT Prize *1"
          />
        </div>
      </div>
    </CustomModal>
  );
}
