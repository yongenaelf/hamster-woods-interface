export interface IRankItem {
  rank?: number;
  score?: number;
  caAddress?: string;
  decimals?: number;
}

interface ISettleDayRankItem {
  caAddress: string;
  score: number;
  decimals: number;
  rank: number;
  fromRank?: number;
  toRank?: number;
  fromScore?: number;
  toScore?: number;
  rewardNftInfo: {
    symbol: string;
    chainId: string;
    tokenName: string;
    imageUrl: string;
    balance: number;
    decimals: number;
  };
}

interface IRankResult {
  rankingList?: IRankItem[] | null;
  selfRank?: IRankItem | null;
  settleDayRankingList?: ISettleDayRankItem[] | null;
  settleDaySelfRank?: ISettleDayRankItem | null;
}

interface IPastRecordItem {
  time: string;
  caAddress: string;
  score: number;
  decimals: number;
  rank: number;
  weekNum: number;
  rewardNftInfo: {
    symbol: string;
    chainId: string;
    tokenName: string;
    imageUrl: string;
    balance: number;
  };
}

export type TPastRecordResult = IPastRecordItem[];

export interface IKingHamsterInfo {
  symbol: string;
  tokenName: string;
  tokenId: number;
  nftImageUrl: string;
}

export interface IClaimableInfoResult {
  claimable: boolean;
  reason: string | null;
  transactionId: string;
  kingHamsterInfo: IKingHamsterInfo;
}

interface IWeekItem extends IRankItem {
  week: string;
}

export interface IRankingHistoryResult {
  season: IRankItem;
  weeks: IWeekItem[];
}

interface IRankingSeasonItem {
  id: string;
  name: string;
  rankBeginTime: string;
  rankEndTime: string;
  showBeginTime: string;
  showEndTime: string;
}

export interface IRankingSeasonListResult {
  season: IRankingSeasonItem[];
}

export enum ChallengeStatus {
  InProgress = 0,
  Settlement = 1,
  LastSettlement = 2,
}

export interface IWeeklyRankResult extends IRankResult {
  status: ChallengeStatus;
  refreshTime: string | null;
}

export interface ISeasonRankResult extends IWeeklyRankResult {
  seasonName: string;
}
