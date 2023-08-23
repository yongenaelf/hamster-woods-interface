import { IBoutInformation, IContractError, IPlayerInformation } from 'types';
import contractRequest from './contractRequest';

export enum ContractMethodType {
  SEND,
  VIEW,
}

const bingoContract = async <T, R>(methodName: string, params: T, type: ContractMethodType) => {
  const contract = contractRequest.get();
  const contractAddress = 'JZdkBE8WTm88TWpUkXk9ep7AHmHnkPFDeLExwfffc2RZnawGt';
  const method = type === ContractMethodType.SEND ? 'callSendMethod' : 'callViewMethod';
  try {
    const res = await contract[method]({
      methodName,
      contractAddress,
      args: params,
    });

    return res as R;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CheckBeanPass = async (address: string): Promise<{ value: boolean } | IContractError> => {
  return await bingoContract('CheckBeanPass', address, ContractMethodType.VIEW);
};

export const GetPlayerInformation = async (address: string): Promise<IPlayerInformation> => {
  return await bingoContract('GetPlayerInformation', address, ContractMethodType.VIEW);
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

export const Play = async (resetStart?: boolean): Promise<{ TransactionId: string }> => {
  return await bingoContract(
    'Play',
    {
      resetStart: !!resetStart,
    },
    ContractMethodType.SEND,
  );
};

export const Bingo = async (hash: string) => {
  return await bingoContract('Bingo', hash, ContractMethodType.SEND);
};

export const GetBingoReward = async (hash: string): Promise<IBoutInformation> => {
  try {
    await bingoContract('Bingo', hash, ContractMethodType.SEND);
    const rewardRes = await GetBoutInformation(hash);
    return rewardRes;
  } catch (error) {
    return Promise.reject(error);
  }
};
