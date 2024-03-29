export interface IOrder {
  _id: string;
  symbol: string;
  name: string;
  direction: string;
  lots: number;
  takeProfit: number;
  stopLoss: number;
  entryPrice: number;
}

export interface OrderWithLivePrice extends IOrder {
  profit?: number;
}
