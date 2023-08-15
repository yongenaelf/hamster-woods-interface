import { graphQLRequest } from 'api/graphql';
import useSWR from 'swr';

interface ITransactionInfo {
  transactionId: string;
  transactionFee: number;
  triggerTime: string;
}

export interface IGameItem {
  id: string;
  gridNum: number;
  score: number;
  transcationFee: number;
  playTransactionInfo: ITransactionInfo;
  bingoTransactionInfo: ITransactionInfo;
}

interface IGameHistoryResult {
  gameList: IGameItem[];
}

export const useGameHis = (address: string) => {
  return useSWR<IGameHistoryResult>([address, 'getGameHis'], async () => {
    const { getGameHis } = await graphQLRequest<{
      getGameHis: IGameHistoryResult;
    }>(`
    query {
      getGameHis(
        getGameHisDto: {
          caAddress: "${address}"
        }
      ) {
        gameList {
          id
          gridNum
          score
          transcationFee
          playTransactionInfo {
            transactionId
            transactionFee
            triggerTime
          }
          bingoTransactionInfo {
            transactionId
            transactionFee
            triggerTime
          }
        }
      }
    }
  `);

    return getGameHis;
  });
};
