import { FC, useEffect, useState } from "react";

import { IOrder } from "../../models/order.type";
import useGetAssetsState from "../../hooks/useGetAssetsState";

interface ILiveProfit {
  orders: IOrder[];
  id: string;
}

const LiveProfit: FC<ILiveProfit> = ({ orders, id }) => {
  const { livePrices } = useGetAssetsState();
  const [profits, setProfits] = useState<Record<string, number>>({});

  useEffect(() => {
    const updatedProfits: Record<string, number> = {};

    orders.forEach((order: IOrder) => {
      const livePrice = livePrices[order.name.toLowerCase()];
      const profit = calculateProfit(order, livePrice);
      updatedProfits[order?._id] = profit;
    });

    setProfits(updatedProfits);
  }, [livePrices]);

  const calculateProfit = (order: IOrder, livePrice: number) => {
    if (order.direction === "Buy") {
      const profit = (livePrice - order.entryPrice) * order.lots;
      return profit;
    } else {
      const profit = (order.entryPrice - livePrice) * order.lots;
      return profit;
    }
  };

  const profit = profits[id] || 0;

  return (
    <td
      className={`py-1 font-medium ${profit > 0 && "text-green-600"} ${
        profit < 0 && "text-red-600"
      }`}
    >
      {profit >= 0
        ? `$${parseFloat(profit.toString()).toFixed(2)}`
        : `-$${Math.abs(parseFloat(profit.toString())).toFixed(2)}`}
    </td>
  );
};

export default LiveProfit;
