import Modal from "../modal";
import { Edit, X } from "lucide-react";
import { FC, useCallback, useEffect, useState } from "react";
import UpdateOrder from "./updateOrder";
import { Socket } from "socket.io-client";
import useGetAssetsState from "../../hooks/useGetAssetsState";
import { calculateProfit, getProfit } from "../../utils/ordersUtils";
import { IOrder, OrderWithLivePrice } from "../../models/order.type";
import {
  useGetOrdersQuery,
  useRemoveOrderMutation,
} from "../../features/orders/orderSlice";

interface IOrders {
  socket: Socket;
}

const Orders: FC<IOrders> = ({ socket }) => {
  const [profits, setProfits] = useState<Record<string, number>>({});
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [triggeredOrders, setTriggeredOrders] = useState<OrderWithLivePrice[]>(
    []
  );

  const { refetch, data: orders } = useGetOrdersQuery();

  const [removeOrder] = useRemoveOrderMutation();

  const handleRemoveOrder = useCallback(async (id: string, profit: number) => {
    try {
      await removeOrder({ id, profit });
    } catch (error) {
      console.log("Failed to close order", error);
    }
  }, []);

  const onModalClose = (): void => {
    setSelectedOrder(null);
  };

  const { livePrices } = useGetAssetsState();

  useEffect(() => {
    const updatedProfits: Record<string, number> = {};
    const triggeredOrders: OrderWithLivePrice[] = [];

    orders?.forEach((order: IOrder) => {
      const { _id, name, takeProfit, stopLoss, direction } = order;

      const livePrice = livePrices[name.toLowerCase()];
      const profit = calculateProfit(order, livePrice);
      updatedProfits[_id] = profit;

      if (livePrice !== undefined) {
        if (direction === "Buy") {
          if (livePrice >= +takeProfit && takeProfit > 0) {
            triggeredOrders.push({ ...order, livePrice });
          } else if (livePrice <= +stopLoss && stopLoss > 0) {
            triggeredOrders.push({ ...order, livePrice });
          }
        } else if (direction === "Sell") {
          if (livePrice <= +stopLoss && stopLoss > 0) {
            triggeredOrders.push({ ...order, livePrice });
          } else if (livePrice >= +takeProfit && takeProfit > 0) {
            triggeredOrders.push({ ...order, livePrice });
          }
        }
      }
    });

    setProfits(updatedProfits);
    setTriggeredOrders(triggeredOrders);
  }, [livePrices, orders]);

  useEffect(() => {
    if (!socket || !triggeredOrders.length) return;

    socket.on("connect", () => {
      console.log("Connected to Socket Server");
    });

    const token = localStorage.getItem("accessToken");

    console.log(triggeredOrders);

    socket.emit("triggered_orders", { token, orders: triggeredOrders });
    setTriggeredOrders([]);
    refetch();

    return () => {
      socket.off("triggered_orders");
    };
  }, [socket, triggeredOrders]);

  return (
    <section className="w-full px-[55px]">
      <div className="w-full">
        <h3 className="p-2 font-semibold text-lg tracking-wide">ORDERS:</h3>

        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-100">
            <tr className="border-2">
              <td className="py-2 font-medium">Symbol</td>
              <td className="py-2 font-medium">Direction</td>
              <td className="py-2 font-medium">Lots</td>
              <td className="py-2 font-medium">Take Profit</td>
              <td className="py-2 font-medium">Stop Loss</td>
              <td className="py-2 font-medium">Floating Profit</td>
              <td className="py-2 font-medium">Manage</td>
            </tr>
          </thead>

          <tbody>
            {orders?.length! > 0 ? (
              orders?.map((order: IOrder) => {
                const { _id, symbol, direction, lots, takeProfit, stopLoss } =
                  order;

                const profit = getProfit(_id, profits);

                return (
                  <tr className="border-b" key={_id}>
                    <td className="py-1 font-medium text-sm">{symbol}</td>
                    <td
                      className={`py-1 font-medium ${
                        direction === "Buy" && "text-green-600"
                      } ${direction === "Sell" && "text-red-600"}`}
                    >
                      {direction}
                    </td>
                    <td className="py-1">
                      {parseFloat(lots.toString()).toFixed(2)}
                    </td>
                    <td className="py-1">{takeProfit}</td>
                    <td className="py-1">{stopLoss}</td>
                    <td
                      className={`py-1 font-medium ${
                        profit > 0 && "text-green-600"
                      } ${profit < 0 && "text-red-600"}`}
                    >
                      {profit >= 0
                        ? `$${parseFloat(profit.toString()).toFixed(2)}`
                        : `-$${Math.abs(parseFloat(profit.toString())).toFixed(
                            2
                          )}`}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <Edit
                          className="h-4 cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        />
                        <X
                          className="h-5 cursor-pointer"
                          onClick={() => handleRemoveOrder(_id, profit)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="border-b text-center">
                <td colSpan={7} className="py-4 text-gray-500 italic">
                  No orders have been placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <Modal onClose={onModalClose}>
          <UpdateOrder order={selectedOrder} onModalClose={onModalClose} />
        </Modal>
      )}
    </section>
  );
};

export default Orders;
