import { IBoutInformation, IContractError, IGameSetting, IPlayerInformation } from 'types';
import contractRequest from './contractRequest';
import { formatErrorMsg } from 'utils/formattError';
import { store } from 'redux/store';
import { getTxResult, getTxResultOnce } from 'utils/getTxResult';
import { sleep } from 'utils/common';

const { configInfo } = store.getState();

export enum ContractMethodType {
  SEND,
  VIEW,
}

const bingoContract = async <T, R>(methodName: string, params: T, type: ContractMethodType) => {
  const contract = contractRequest.get();
  const contractAddress = configInfo.configInfo!.bingoContractAddress;
  const method = type === ContractMethodType.SEND ? 'callSendMethod' : 'callViewMethod';
  try {
    const res = await contract[method]({
      methodName,
      contractAddress,
      args: params,
    });

    return res as R;
  } catch (error) {
    const resError = error as IContractError;
    console.error('=====bingoContract', resError);
    return Promise.reject(formatErrorMsg(resError));
  }
};

export const CheckBeanPass = async (address: string): Promise<{ value: boolean } | IContractError> => {
  return await bingoContract('CheckBeanPass', address, ContractMethodType.VIEW);
};

export const GetPlayerInformation = async (address: string): Promise<IPlayerInformation> => {
  return await bingoContract('GetPlayerInformation', address, ContractMethodType.VIEW);
};

export const GetGameLimitSettings = async (): Promise<IGameSetting> => {
  return await bingoContract('GetGameLimitSettings', null, ContractMethodType.VIEW);
};

export const GetBoutInformation = async (playId: string): Promise<IBoutInformation> => {
  return await bingoContract(
    'GetBoutInformation',
    {
      playId,
    },
    ContractMethodType.VIEW,
  );
};

export const Play = async (
  resetStart?: boolean,
): Promise<{ TransactionId: string; TxResult: any; startTime: number }> => {
  const contract = contractRequest.get();
  const contractAddress = configInfo.configInfo!.bingoContractAddress;

  try {
    const { transactionId, chainId, rpcUrl } = await contract.callSendMethodNoResult({
      methodName: 'Play',
      contractAddress,
      args: {
        resetStart: !!resetStart,
      },
    });

    let result;

    await sleep(1000);
    const { status, txResult } = await getTxResultOnce(transactionId, rpcUrl!);
    result = txResult;
    if (['pending', 'notexisted'].includes(status)) {
      await sleep(500);
      const finalTxRes = await getTxResult(transactionId!, chainId!, 0, rpcUrl!);
      result = finalTxRes.txResult;
    }

    return {
      TransactionId: transactionId,
      TxResult: result,
      startTime: Date.now(),
    };
  } catch (error) {
    const resError = error as IContractError;
    console.error('=====bingoContract', resError);
    return Promise.reject(formatErrorMsg(resError));
  }
};

// export const Bingo = async (hash: string) => {
//   return await bingoContract('Bingo', hash, ContractMethodType.SEND);
// };

export const GetBingoReward = async (hash: string): Promise<IBoutInformation> => {
  try {
    await bingoContract('Bingo', hash, ContractMethodType.SEND);
    const rewardRes = await GetBoutInformation(hash);
    return rewardRes;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Bingo = async (hash: string): Promise<{ TransactionId: string; TxResult: any }> => {
  const contract = contractRequest.get();
  const contractAddress = configInfo.configInfo!.bingoContractAddress;

  try {
    const { transactionId, chainId, rpcUrl } = await contract.callSendMethodNoResult({
      methodName: 'Bingo',
      contractAddress,
      args: {
        hash,
      },
    });

    // const startTime = Date.now();
    let result;

    const { status, txResult } = await getTxResultOnce(transactionId, rpcUrl!);
    result = txResult;
    if (['pending', 'notexisted'].includes(status)) {
      await sleep(2000);

      const response = await getTxResultOnce(transactionId, rpcUrl!);
      result = response.txResult;

      if (['pending', 'notexisted'].includes(response.status)) {
        const finalTxRes = await getTxResult(transactionId!, chainId!, 0, rpcUrl!);
        result = finalTxRes.txResult;
      }
    }

    return {
      TransactionId: transactionId,
      TxResult: result,
    };
  } catch (error) {
    const resError = error as IContractError;
    console.error('=====bingoContract', resError);
    return Promise.reject(formatErrorMsg(resError));
  }
};
