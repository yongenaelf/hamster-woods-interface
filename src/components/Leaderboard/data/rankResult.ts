export interface IRankItem {
  rank: number;
  score: number;
  caAddress: string;
}

export interface IRankResult {
  rankingList: IRankItem[];
  selfRank: IRankItem;
}
