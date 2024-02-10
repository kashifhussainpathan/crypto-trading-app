import Button from "../@ui/button";
import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../../models/order.type";
import { IAsset } from "../../models/assets.type";
import useGetAssetsState from "../../hooks/useGetAssetsState";
import { usePlaceOrderMutation } from "../../features/orders/orderSlice";

interface IPlaceOrder {
  asset: IAsset;
  onModalClose: () => void;
}

const PlaceOrder: FC<IPlaceOrder> = ({ asset, onModalClose }) => {
  const navigate = useNavigate();

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  const { livePrices } = useGetAssetsState();
  const coinName = asset.name.toLowerCase();
  const price = livePrices[coinName];

  const [order, setOrder] = useState<IOrder>({
    _id: "0",
    symbol: asset.symbol,
    name: asset.name,
    direction: "Buy",
    lots: 1,
    takeProfit: 0,
    stopLoss: 0,
    entryPrice: 0,
  });

  const formattedPrice =
    parseFloat(price?.toString() || asset?.priceUsd.toString()) > 1000
      ? parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(2)
      : parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(3);

  const handleIncrement = () => {
    setOrder((prev: IOrder): IOrder => ({ ...prev, lots: order.lots + 1 }));
  };

  const handleDecrement = () => {
    if (order.lots > 1) {
      setOrder((prev: IOrder): IOrder => ({ ...prev, lots: order.lots - 1 }));
    }
  };

  const handleSetDirection = (direction: string) => {
    setOrder((prev: IOrder): IOrder => ({ ...prev, direction }));
  };

  const handlePlaceOrder = async () => {
    const isLoggedIn = localStorage.getItem("isLogin");
    if (!isLoggedIn) {
      navigate("/profile");
    }
    const newOrder = { ...order, entryPrice: price };
    try {
      await placeOrder(newOrder);
      onModalClose();
    } catch (error) {
      onModalClose();
      console.log("Failed to add order", error);
    }
  };

  return (
    <div className="p-4">
      <h3 className="font-medium text-lg">Place Order</h3>

      <hr className="my-1" />

      {/* asset name */}
      <div className="my-2 font-medium flex gap-1 items-center">
        <img
          src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
          alt="coin icon"
          className="w-6 h-6 rounded-full"
        />
        {asset.name}
      </div>

      {/* Order Direction */}
      <div className="w-full mx-auto bg-gray-100 rounded-md flex items-center h-14 justify-between p-2 font-medium">
        <div
          className={`py-[2px] px-[28px] rounded-md cursor-pointer ${
            order.direction === "Sell" && "bg-gray-200"
          }`}
          onClick={() => handleSetDirection("Sell")}
        >
          <p className="text-sm text-center">Sell</p>
          <p className="text-sm text-center text-red-600">${formattedPrice}</p>
        </div>
        <div
          className={`py-[2px] px-[28px] rounded-md cursor-pointer ${
            order.direction === "Buy" && "bg-gray-200"
          }`}
          onClick={() => handleSetDirection("Buy")}
        >
          <p className="text-sm text-center">Buy</p>
          <p className="text-sm text-center text-green-600">
            ${formattedPrice}
          </p>
        </div>
      </div>

      <hr className="my-3" />

      {/* Order Volume */}
      <div className="w-full">
        <p className="my-1 font-medium">Order Volume</p>
        <div className="flex items-center justify-center">
          <div
            className="font-semibold shadow border border-gray-100 rounded-md text-lg px-3 py-[2px] cursor-pointer"
            onClick={handleDecrement}
          >
            -
          </div>
          <input
            type="number"
            value={order.lots.toFixed(2)}
            readOnly
            className="mx-2 border border-gray-100 w-[70%] inline-block py-1 text-center rounded-md shadow"
          />
          <div
            className="font-semibold shadow border border-gray-100 rounded-md text-lg px-3 py-[2px] cursor-pointer"
            onClick={handleIncrement}
          >
            +
          </div>
        </div>
      </div>

      {/* Place order button */}

      <Button
        className="w-[100%] mx-auto mt-4 !text-base py-2 bg-gray-800 text-white border-none !font-base"
        onClick={handlePlaceOrder}
      >
        {isLoading ? (
          <div
            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
            role="status"
            aria-label="loading"
          ></div>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  );
};

export default memo(PlaceOrder);
