import Modal from "../modal";
import { X } from "lucide-react";
import { useState } from "react";
import LiveProfit from "./liveProfit";
import CloseOrder from "./closeOrder";
import {
  useGetOrdersQuery,
  useRemoveOrderMutation,
} from "../../features/orders/orderSlice";
import { IOrder } from "../../models/order.type";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const { data: orders } = useGetOrdersQuery();
  const [removeOrder] = useRemoveOrderMutation();

  const onModalClose = (): void => {
    setSelectedOrder(null);
  };

  const handleRemoveOrder = async (id: string) => {
    try {
      await removeOrder(id);
    } catch (error) {
      console.log("Failed to close order", error);
    }
  };

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
              <td className="py-2 font-medium"></td>
            </tr>
          </thead>

          <tbody>
            {orders?.length! > 0 ? (
              orders?.map((order: IOrder) => {
                const { symbol, direction, lots, takeProfit, stopLoss } = order;
                return (
                  <tr className="border-b" key={order._id}>
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
                    <LiveProfit
                      orders={orders}
                      id={order?._id}
                      key={order._id}
                    />
                    <td>
                      <X
                        className="h-5 cursor-pointer"
                        onClick={() => handleRemoveOrder(order?._id)}
                      />
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
          <CloseOrder />
        </Modal>
      )}
    </section>
  );
};

export default Orders;
