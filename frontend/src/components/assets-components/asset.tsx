import { FC } from "react";
import { IAsset } from "../../models/assets.type";
import buySellImage from "../../assets/buysell.png";

interface IAssetCard {
  asset: IAsset;
  onCoinClick: (asset: string) => void;
  openModal: (asset: IAsset) => void;
  coinPrices: Record<string, number>;
  highlightedRows: string[];
}

const AssetCard: FC<IAssetCard> = ({
  asset,
  onCoinClick,
  openModal,
  coinPrices,
  highlightedRows,
}) => {
  const coinName = asset.name.toLowerCase();
  const price = coinPrices[coinName];
  const changePercentIn24Hr = parseFloat(asset.changePercent24Hr).toFixed(2);

  const assetName = asset.name.toLowerCase().split(" ").join("-");

  const isGreen =
    highlightedRows.includes(assetName) && +changePercentIn24Hr > 0;
  const isRed = highlightedRows.includes(assetName) && +changePercentIn24Hr < 0;

  const formattedPrice =
    parseFloat(price?.toString() || asset?.priceUsd.toString()) > 1000
      ? parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(2)
      : parseFloat(price?.toString() || asset?.priceUsd.toString()).toFixed(3);

  return (
    <tr
      key={asset.id}
      className={`border cursor-pointer px-4 ${isGreen && "bg-green-50"} ${
        isRed && "bg-red-50"
      }`}
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
          <div className="font-semibold text-base">{asset.name}</div>
          <div className="text-gray-500 text-xs">{asset.symbol}</div>
        </div>
      </td>
      <td
        className={`text-sm font-medium ${isGreen && "text-green-600"} ${
          isRed && "text-red-600"
        }`}
      >
        ${formattedPrice}
      </td>
      <td
        className={`text-sm font-medium text-center gap-2 ${
          +changePercentIn24Hr > 0 ? "text-green-600" : "text-red-600"
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
};

export default AssetCard;
