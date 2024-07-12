import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useGetState from 'redux/state/useGetState';
import { WalletType } from 'types';
import { LeftOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import { ComponentStyle, Deposit, ETransferDepositProvider } from '@etransfer/ui-react';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';
import { ModalProps } from 'antd';

export default function DepositModal(
  props: ModalProps & {
    onCancel: () => void;
  },
) {
  const { open } = props;

  const isMobile = useIsMobile();

  return (
    <CustomModal
      className={`${isMobile ? '!w-[358px]' : '!w-[1000px] md:!w-[1000px]'} `}
      open={open}
      centered
      title="Deposit"
      {...props}>
      <div
        className={`overflow-auto mb-[8px] [&::-webkit-scrollbar]:hidden ${
          isMobile ? 'max-h-[50vh] h-[42rem]]' : 'h-[40rem]'
        }`}>
        <ETransferDepositProvider>
          <Deposit
            // containerClassName={styles.depositWrap}
            className={isMobile ? styles.mobileDepositWrap : styles.pcDepositWrap}
            componentStyle={isMobile ? ComponentStyle.Mobile : ComponentStyle.Web}
          />
        </ETransferDepositProvider>
      </div>
    </CustomModal>
  );
}
