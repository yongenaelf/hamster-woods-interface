import { graphQLRequest } from 'api/graphql';
import { MAX_GAME_RECORD_ITEMS } from 'constants/platform';
import { useAddress } from 'hooks/useAddress';
import { useCallback } from 'react';
import { addPrefixSuffix } from 'utils/addressFormatting';

export interface ITransactionInfo {
  transactionId: string;
  transactionFee: number;
  triggerTime: string;
}

export interface IGameItem {
  id: string;
  gridNum: number;
  score: number;
  transcationFee: number;
  playTransactionInfo: ITransactionInfo | null;
  bingoTransactionInfo: ITransactionInfo | null;
}

export interface IGameHistoryResult {
  gameList: IGameItem[];
}
export type TransactionInfo = {
  transactionId: string;
  transactionFee: number;
  triggerTime: string;
};

export type BuyChanceItem = {
  id: string;
  cost: number;
  chance: number;
  symbol: string;
  decimals: number;
  transactionFee: number;
  transactionInfo: TransactionInfo;
};

export interface IBuyHistoryResult {
  BuyChanceList: BuyChanceItem[];
}

export const useGameHistory = () => {
  const address = addPrefixSuffix(useAddress());
  const gameHistory = useCallback(async () => {
    const { getGameHistory } =
      (await graphQLRequest<{
        getGameHistory: IGameHistoryResult;
      }>(`
      query {
        getGameHistory(
          getGameHisDto: {
            caAddress: "${address}"
            skipCount: 0
            maxResultCount: ${MAX_GAME_RECORD_ITEMS}
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
    `)) || {};

    return getGameHistory;
  }, [address]);

  return { gameHistory };
};

export const useBuyHistory = () => {
  const address = addPrefixSuffix(useAddress());
  const buyHistory = useCallback(async () => {
    const { getBuyChanceRecords } =
      (await graphQLRequest<{
        getBuyChanceRecords: IBuyHistoryResult;
      }>(`
      query {
        getBuyChanceRecords(
          getBuyChanceRecordsDto: {
            caAddress: "${address}"
            skipCount: 0
            maxResultCount: ${MAX_GAME_RECORD_ITEMS}
          }
        ) {
          buyChanceList {
            id
            cost
            chance
            transcationFee
            transactionInfo {
              transactionId
              transactionFee
              triggerTime
            }
          }
        }
      }
    `)) || {};

    return getBuyChanceRecords;
  }, [address]);

  return { buyHistory };
};
