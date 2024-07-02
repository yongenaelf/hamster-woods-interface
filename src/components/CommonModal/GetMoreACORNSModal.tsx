import CustomModal, { ICustomModalProps } from 'components/CustomModal';
import NeatImageIcon from 'assets/images/neat.png';
import CommonBtn from 'components/CommonBtn';

export default function GetMoreACORNSModal({ open, onCancel, ...props }: ICustomModalProps) {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      {...props}
      title={
        <div className="flex items-center justify-center gap-[10px] font-fonarto">
          Acquire <img width={26} className="w-[26px] h-[26px]" src={NeatImageIcon.src} alt="neat" /> $ACORNS
        </div>
      }>
      <div className="text-[24px] leading-[32px]">
        {`$ACORNS is a crypto asset which can both be earned via Hamster Woods gameplay and traded on decentralised
        exchange.`}
      </div>
      <div className="text-[24px] leading-[32px]">{`To acquire more $ACORNS, it's recommended to use AwakenSwap where trading pairs like ACORNS/ELF or ACORNS/USDT are supported.`}</div>
      <div className="text-[24px] leading-[32px]">
        If you need help using <span className="underline text-[#3989FF] font-[600]">AwakenSwap</span>, feel free to
        check out the tutorial.
      </div>
      <CommonBtn
        className="!h-[76px] flex justify-center items-center font-fonarto !text-[32px] !leading-[40px] mx-[64px] mt-[40px]"
        title="Trade on AwakenSwap"
        onClick={() => {
          // go to swap
        }}
      />
    </CustomModal>
  );
}
