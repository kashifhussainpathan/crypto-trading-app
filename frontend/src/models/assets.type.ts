export interface IAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export interface IAssetsState {
  livePrices: Record<string, number>;
  assets: IAsset[];
  totalProfit: number;
  highlightedRows: string[];
}
