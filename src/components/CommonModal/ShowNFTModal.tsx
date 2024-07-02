import { ShowBeanPassType, ShowNFTModalPropsType } from './type';
import CustomModal from 'components/CustomModal';
import LinkImageIcon from 'assets/images/link-icon.png';
import useGetState from 'redux/state/useGetState';
import { useMemo } from 'react';

export default function ShowNftModal({ type, onCancel, open, beanPassItem }: ShowNFTModalPropsType) {
  const { curBeanPass } = useGetState();
  const hamsterPassInfo = useMemo(() => beanPassItem || curBeanPass, [beanPassItem, curBeanPass]);
  return (
    <CustomModal
      destroyOnClose
      className={`!w-[358px] md:!w-[580px]`}
      open={open}
      title={type === ShowBeanPassType.Display ? 'Your HamsterPass' : 'Congratulations!'}
      onCancel={onCancel}>
      <>
        <div className="mx-auto h-[160px] w-[160px] md:mt-0 md:h-[240px] md:w-[240px] relative">
          <img src={hamsterPassInfo?.nftImageUrl || ''} alt="" className="w-full h-full" />
        </div>
        <div className="w-[160px] md:w-[271px] mx-auto flex justify-between items-center md:text-[24px] text-base md:leading-[32px] leading-[24px] font-bold md:mt-[35px] mt-[24px] md:mb-[28px]">
          <span className="py-1">{`${hamsterPassInfo?.tokenName} #${hamsterPassInfo?.tokenId}`}</span>
          <img src={LinkImageIcon.src} alt="link" width={32} className="w-[32px] h-[32px]" />
        </div>
      </>
    </CustomModal>
  );
}
