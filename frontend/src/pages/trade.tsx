import Orders from "../components/orders/orders";
import Assets from "../components/assets-components/assets";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useState } from "react";

const Trade = () => {
  const [asset, setAsset] = useState<string>("BINANCE:btcusd");

  const handleAssetClick = (asset: string): void => {
    const coinName =
      asset === "USDT" ? "usdtusd" : `BINANCE:${asset.toLowerCase()}usdt`;
    setAsset(coinName);
  };
  return (
    <section className="grid grid-cols-main">
      <Assets onCoinClick={handleAssetClick} />
      <div>
        <AdvancedRealTimeChart
          key={asset}
          symbol={asset}
          theme="light"
          height={500}
          interval="5"
          allow_symbol_change={false}
        />
        <Orders />
      </div>
    </section>
  );
};

export default Trade;
