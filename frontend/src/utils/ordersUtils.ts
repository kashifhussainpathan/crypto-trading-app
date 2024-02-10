import { IOrder } from "../models/order.type";

export const calculateProfit = (order: IOrder, livePrice: number) => {
  if (order.direction === "Buy") {
    const profit = (livePrice - order.entryPrice) * order.lots;
    return profit;
  } else {
    const profit = (order.entryPrice - livePrice) * order.lots;
    return profit;
  }
};

export const getProfit = (
  orderId: string,
  profits: Record<string, number>
): number => {
  const profit = profits[orderId] || 0;
  return profit;
};
