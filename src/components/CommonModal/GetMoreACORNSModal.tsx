import CustomModal, { ICustomModalProps } from 'components/CustomModal';
import NeatImageIcon from 'assets/images/neat.png';
import CommonBtn from 'components/CommonBtn';
import { useIsMobile } from 'redux/selector/mobile';
import { useMemo, useState } from 'react';
import { AppState, dispatch } from 'redux/store';
import { useSelector } from 'react-redux';
import DepositModal from 'components/Deposit';
import { useQueryAuthToken } from 'hooks/authToken';
import openPage from 'utils/openPage';
import styles from './style.module.css';

export default function GetMoreACORNSModal({ open, onCancel, ...props }: ICustomModalProps) {
  const { getETransferAuthToken } = useQueryAuthToken();

  const { configInfo } = useSelector((state: AppState) => state.configInfo);
  const [showDeposit, setShowDeposit] = useState(false);
  const isMobile = useIsMobile();
  const textClassName = useMemo(
    () => `${isMobile ? 'text-[16px] leading-[24px]' : 'text-[24px] leading-[32px]'} mb-[12px]`,
    [isMobile],
  );

  return (
    <CustomModal
      open={open}
      centered
      onCancel={onCancel}
      className={styles.getMoreACORNSModal}
      {...props}
      title={
        <div className="flex items-center justify-center gap-[10px] font-paytone">
          Acquire <img width={26} className="w-[26px] h-[26px]" src={NeatImageIcon.src} alt="neat" /> $ACORNS
        </div>
      }>
      <div className={`flex flex-col ${isMobile ? 'max-h-[50vh] h-[22rem]' : ''} `}>
        <div className={`flex-1 overflow-auto  ${isMobile ? 'px-[16px]' : 'px-[32px]'} `}>
          <div className={textClassName}>
            {`$ACORNS is a crypto asset which can both be earned via Hamster Woods gameplay and traded on decentralised exchange.`}
          </div>
          <div
            className={
              textClassName
            }>{`To acquire more $ACORNS, it's recommended to use the cross-chain tool, ETransfer, which allows you to swap $USDT directly for $ACORNS.`}</div>
          <div className={textClassName}>
            If you need help using{' '}
            <span
              onClick={() => {
                openPage(configInfo?.awakenTutorialUrl ?? '');
              }}
              className="underline text-[#3989FF] font-[600]">
              ETransfer
            </span>
            , feel free to check out the tutorial.
          </div>
        </div>
        <CommonBtn
          className={`${
            isMobile
              ? '!h-[44px] !text-[20px] !leading-[20px] mx-[16px] mt-[8px] mb-[24px]'
              : '!h-[76px] !text-[32px] !leading-[40px] mx-[64px] my-[40px]'
          } flex justify-center items-center font-paytone`}
          title="Go to ETransfer"
          onClick={async () => {
            // openPage(`${configInfo?.awakenUrl}/trading/ACORNS_ELF_0.3`);
            // onCancel?.();
            await getETransferAuthToken();
            setShowDeposit(true);
          }}
        />
      </div>
      <DepositModal open={showDeposit} onCancel={() => setShowDeposit(false)} />
    </CustomModal>
  );
}
