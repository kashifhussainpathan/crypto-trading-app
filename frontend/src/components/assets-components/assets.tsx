import { FC, useState } from "react";

import Modal from "../modal";
import PlaceOrder from "../orders/placeOrder";
import CoinsLoader from "../loaders/coinsLoader";
import { IAsset } from "../../models/assets.type";
import buySellImage from "../../assets/buysell.png";
import useGetCoins from "../../hooks/useGetCoins";
import useGetCoinsPrice from "../../hooks/useGetCoinsPrice";
import { ArrowUpDown, CandlestickChart, CircleDollarSign } from "lucide-react";

export interface IAssetsProps {
  onCoinClick: (asset: string) => void;
}

const Assets: FC<IAssetsProps> = ({ onCoinClick }) => {
  const { coinData } = useGetCoins();

  const { highlightedRows, coinPrices } = useGetCoinsPrice();

  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);

  const getCoinDetails = (asset: IAsset) => {
    const coinName = asset.name.toLowerCase();
    const price = coinPrices[coinName];
    const changePercentIn24Hr = parseFloat(asset.changePercent24Hr).toFixed(2);

    const isGreen = highlightedRows.includes(
      `${asset.name.toLowerCase()}-green`
    );
    const isRed = highlightedRows.includes(`${asset.name.toLowerCase()}-red`);

    const formattedPrice =
      parseFloat(price?.toString() || asset?.priceUsd.toString()) > 1000
        ? parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(2)
        : parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(
            3
          );

    return { price, changePercentIn24Hr, isGreen, isRed, formattedPrice };
  };

  const openModal = (asset: IAsset) => {
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="w-full">
      <div className="h-[100vh] overflow-y-auto">
        <table className="w-full border-collapse border">
          <thead className="border-2">
            <tr className="text-left">
              <th className="tracking-wide p-2 pl-4 flex items-center gap-1">
                <CircleDollarSign className="h-5" />
                Name
              </th>
              <th className="tracking-wide ">Price</th>
              <th className="tracking-wide px-2 text-center ">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4" />
                  (24hr)
                </div>
              </th>
              <th className="pl-3 w-12 text-center">
                <CandlestickChart className="h-5" />
              </th>
            </tr>
          </thead>
          <tbody className="w-[450px] h-90vh overflow-x-hidden overflow-y-scroll">
            {coinData.length === 0 ? (
              <CoinsLoader />
            ) : (
              coinData.map((asset: IAsset) => {
                const { changePercentIn24Hr, isGreen, isRed, formattedPrice } =
                  getCoinDetails(asset);
                return (
                  <tr
                    key={asset.id}
                    className={`border cursor-pointer px-4 ${
                      isGreen && "bg-green-50"
                    } ${isRed && "bg-red-50"}`}
                  >
                    <td
                      className="pl-3 py-1 flex items-center gap-2"
                      onClick={() => onCoinClick(asset.symbol)}
                    >
                      <img
                        src={`https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`}
                        alt={asset.name}
                        className="h-8 w-8 rounded-full"
                      />{" "}
                      <div>
                        <div className="font-semibold text-base">
                          {asset.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {asset.symbol}
                        </div>
                      </div>
                    </td>
                    <td
                      className={`text-sm font-medium ${
                        isGreen && "text-green-600"
                      } ${isRed && "text-red-500"}`}
                    >
                      ${formattedPrice}
                    </td>
                    <td
                      className={`text-sm font-medium text-center gap-2 ${
                        +changePercentIn24Hr > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {changePercentIn24Hr}%
                    </td>
                    <td>
                      <img
                        src={buySellImage}
                        alt="buy sell image"
                        className="w-[22px] mx-auto cursor-pointer"
                        onClick={() => openModal(asset)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedAsset && (
        <Modal onClose={closeModal}>
          <PlaceOrder asset={selectedAsset} onModalClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};
export default Assets;
