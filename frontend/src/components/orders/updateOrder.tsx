import Button from "../@ui/button";
import { ChangeEvent, FC, useState } from "react";
import { IOrder } from "../../models/order.type";
import { useUpdateOrderMutation } from "../../features/orders/orderSlice";

interface IUpdateOrder {
  order: IOrder;
  onModalClose: () => void;
}

interface IUpdateOrderState {
  stopLoss: number;
  takeProfit: number;
}

const UpdateOrder: FC<IUpdateOrder> = ({ order, onModalClose }) => {
  const { _id, stopLoss, takeProfit, symbol, name } = order;

  const [updateOrderState, setUpdateOrder] = useState<IUpdateOrderState>({
    stopLoss: stopLoss,
    takeProfit: takeProfit,
  });

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const handleUpdateOrder = async () => {
    const updatedOrder = {
      stopLoss: +updateOrderState.stopLoss,
      takeProfit: +updateOrderState.takeProfit,
    };

    try {
      await updateOrder({ orderId: _id, updatedOrder });
      onModalClose();
    } catch (error) {
      console.log("Faild to update order");
    }
  };

  const handleSetOrderValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdateOrder((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <h3 className="font-medium text-lg">Update Order</h3>

      <hr className="my-1" />

      {/* asset name */}
      <div className="my-2 font-medium flex gap-1 items-center">
        <img
          src={`https://assets.coincap.io/assets/icons/${symbol?.toLowerCase()}@2x.png`}
          alt="coin icon"
          className="w-6 h-6 rounded-full"
        />
        {name}
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label htmlFor="takeProfit" className="font-medium">
          Take Profit
        </label>
        <input
          type="text"
          id="takeProfit"
          name="takeProfit"
          value={updateOrderState.takeProfit}
          placeholder="Enter desired take profit level"
          className="border border-gray-100 w-full py-1 px-2 rounded-md shadow"
          onChange={handleSetOrderValues}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="stoploss" className="font-medium">
          Stop Loss
        </label>
        <input
          type="text"
          id="stoploss"
          name="stopLoss"
          value={updateOrderState.stopLoss}
          placeholder="Enter desired stop loss level"
          className="border border-gray-100 w-full py-1 px-2 rounded-md shadow"
          onChange={handleSetOrderValues}
        />
      </div>

      <Button onClick={handleUpdateOrder} className="w-full">
        {isLoading ? (
          <div
            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
            role="status"
            aria-label="loading"
          ></div>
        ) : (
          "Update Order"
        )}
      </Button>
    </div>
  );
};

export default UpdateOrder;
