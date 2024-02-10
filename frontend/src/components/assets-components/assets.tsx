import { FC, useState } from "react";

import Modal from "../modal";
import AssetCard from "./asset";
import PlaceOrder from "../orders/placeOrder";
import CoinsLoader from "../loaders/coinsLoader";
import { IAsset } from "../../models/assets.type";
import useGetCoins from "../../hooks/useGetCoins";
import useGetAssetsState from "../../hooks/useGetAssetsState";
import { ArrowUpDown, CandlestickChart, CircleDollarSign } from "lucide-react";

export interface IAssetsProps {
  onCoinClick: (asset: string) => void;
}

const Assets: FC<IAssetsProps> = ({ onCoinClick }) => {
  const { coinData } = useGetCoins();
  const { livePrices, highlightedRows } = useGetAssetsState();

  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);

  const openModal = (asset: IAsset) => {
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="w-full">
      <div className="h-[90vh] overflow-y-auto">
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
                return (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    openModal={openModal}
                    coinPrices={livePrices}
                    onCoinClick={onCoinClick}
                    highlightedRows={highlightedRows}
                  />
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
