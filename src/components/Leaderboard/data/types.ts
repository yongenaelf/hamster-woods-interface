export interface IRankItem {
  rank: number;
  score: number;
  caAddress: string;
}

interface IRankResult {
  rankingList: IRankItem[];
  selfRank: IRankItem;
}

export interface IRankingSeasonHistoryResult {
  season: IRankItem;
  weeks: IRankItem[];
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

export enum WeeklyChallengeStatus {
  InProgress = 0,
  Settlement = 1,
  LastSettlement = 2,
}

export type ISeasonRankResult = IRankResult;
export interface IWeeklyRankResult extends IRankResult {
  status: WeeklyChallengeStatus;
  refreshTime: string | null;
}
