import useSWR from 'swr';

interface ITransactionInfo {
  TransactionId: string;
  TranscationFee: number;
  /**
   * Timestamp
   */
  TriggerTime: string;
}

export interface IGameItem {
  GridNum: number;
  Score: number;
  TranscationFee: number;
  PlayTransactionInfo: ITransactionInfo;
  BingoTransactionInfo: ITransactionInfo;
}

interface IGameHistoryResult {
  GameList: IGameItem[];
}

export const useGameHis = (address: string) => {
  return useSWR<IGameHistoryResult>([address, 'getGameHis'], async () => {
    // handle logic to fetch here.
    const mockFetcher = async () => {
      return {
        GameList: [
          {
            GridNum: 3,
            Score: 20,
            TranscationFee: 20,
            PlayTransactionInfo: {
              TransactionId: 'dfkljasldfjlasdjflksdafl',
              TranscationFee: 80,
              TriggerTime: new Date().toISOString(), //timestamp
            },
            BingoTransactionInfo: {
              TransactionId: 'jasdlfjasldjfklasjdlfkjs',
              TranscationFee: 80,
              TriggerTime: new Date().toISOString(),
            },
          },
        ],
      };
    };

    return await mockFetcher();
  });
};
