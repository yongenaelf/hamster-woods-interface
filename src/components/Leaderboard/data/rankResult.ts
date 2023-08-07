interface IRankItem {
  caAddress: string;
  score: number;
  rank: number;
}

export interface IRankResult {
  rankingList: IRankItem[];
  selfRank: IRankItem;
}
