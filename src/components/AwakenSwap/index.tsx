import styles from './style.module.css';
import { useIsMobile } from 'redux/selector/mobile';
import CustomModal from 'components/CustomModal';
import { ModalProps } from 'antd';
import { ComponentType, Swap, ISwapProps } from '@portkey/trader-react-ui';
import { AwakenSwapper } from '@portkey/trader-core';
import useWebLogin from 'hooks/useWebLogin';
import '@portkey/trader-react-ui/dist/assets/index.css';
import { WalletType } from 'types';

// TODO
const awakenInstance = new AwakenSwapper({
  contractConfig: {
    swapContractAddress: '2vahJs5WeWVJruzd1DuTAu3TwK8jktpJ2NNeALJJWEbPQCUW4Y',
    rpcUrl: 'https://tdvw-test-node.aelf.io',
  },
  requestDefaults: {
    baseURL: 'https://test.awaken.finance',
  },
});

export default function AwakenSwapModal(
  props: ModalProps &
    ISwapProps & {
      onCancel: () => void;
    },
) {
  const { open, selectTokenInSymbol, selectTokenOutSymbol, onCancel } = props;

  const { getOptions, tokenApprove, walletType } = useWebLogin({});

  const isMobile = useIsMobile();

  return (
    <CustomModal
      className={`${isMobile ? '!w-[358px]' : '!w-[1000px] md:!w-[1000px]'} `}
      open={open}
      centered
      title="Swap"
      destroyOnClose
      {...props}>
      <div
        className={`overflow-auto mb-[8px] [&::-webkit-scrollbar]:hidden ${
          isMobile ? 'max-h-[50vh] h-[42rem]]' : 'h-[40rem]'
        }`}>
        <Swap
          selectTokenInSymbol={selectTokenInSymbol}
          selectTokenOutSymbol={selectTokenOutSymbol}
          containerClassName={styles.depositWrap}
          componentUiType={ComponentType.Web}
          onConfirmSwap={onCancel}
          awaken={{
            instance: awakenInstance,
            tokenApprove: walletType === WalletType.discover ? undefined : tokenApprove,
            getOptions,
          }}
        />
      </div>
    </CustomModal>
  );
}
