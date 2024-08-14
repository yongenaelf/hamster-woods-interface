import { useIsMobile } from 'redux/selector/mobile';
import styles from './style.module.css';

export const FluxPointsTabContent = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`w-full h-full flex-col justify-start items-start inline-flex ${
        isMobile ? 'py-[16px]' : 'py-[24px]'
      } overflow-hidden`}>
      {/* header */}
      <div className="self-stretch h-9 px-4 py-[10px] bg-[#DEC49D] rounded-md flex flex-col justify-between items-start">
        <div className="self-stretch flex justify-start items-start gap-4 inline-flex">
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } flex-1 text-[#AE694C] font-roboto font-normal leading-4 break-words`}>
            Task
          </div>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } w-50 text-[#AE694C] font-roboto font-normal leading-4 break-words`}>
            Point
          </div>
        </div>
      </div>
      {/* item  */}
      <div className={`${styles.scrollbar} h-full overflow-y-auto overflow-hidden`}>
        <div
          className={`${
            isMobile ? 'px-2' : 'px-4'
          } self-stretch py-3 border-b border-[#D3B68A] flex justify-start items-center gap-4 inline-flex`}>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } flex-1 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            Provide liquidity to the ACORNS/ELF trading pair on AwakenSwap
          </div>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } w-50 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            2,000,000 ACORNS point-1
          </div>
        </div>
        <div
          className={`${
            isMobile ? 'px-2' : 'px-4'
          } self-stretch py-3 border-b border-[#D3B68A] flex justify-start items-center gap-4 inline-flex`}>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } flex-1 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            Provide liquidity to the ACORNS/ELF trading pair on AwakenSwap
          </div>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } w-50 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            2,000,000 ACORNS point-1
          </div>
        </div>
        <div
          className={`${
            isMobile ? 'px-2' : 'px-4'
          } self-stretch py-3 border-b border-[#D3B68A] flex justify-start items-center gap-4 inline-flex`}>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } flex-1 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            Provide liquidity to the ACORNS/ELF trading pair on AwakenSwap
          </div>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } w-50 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            2,000,000 ACORNS point-1
          </div>
        </div>
        <div
          className={`${
            isMobile ? 'px-2' : 'px-4'
          } self-stretch py-3 border-b border-[#D3B68A] flex justify-start items-center gap-4 inline-flex`}>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } flex-1 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            Provide liquidity to the ACORNS/ELF trading pair on AwakenSwap
          </div>
          <div
            className={`${
              isMobile ? 'text-[12px]' : 'text-[16px]'
            } w-50 text-[#953D22] font-roboto font-normal leading-4 break-words`}>
            2,000,000 ACORNS point-1
          </div>
        </div>
      </div>
    </div>
  );
};
