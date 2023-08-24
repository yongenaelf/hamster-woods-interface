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

export interface ISeasonRankResult extends IRankResult {
  status?: number;
  refreshTime?: string;
}
export interface IWeeklyRankResult extends IRankResult {
  status: number;
  refreshTime: string;
}
