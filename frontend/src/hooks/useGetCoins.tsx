import { useEffect, useState } from "react";
import { Coin } from "../models/coin.type";

const useGetCoins = () => {
  const [coinData, setCoinData] = useState<Coin[]>([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort(
          (a: Coin, b: Coin) => +b.volumeUsd24Hr - +a.volumeUsd24Hr
        );
        setCoinData(sortedData);
      })
      .catch((error) => console.error(error));
  }, []);
  return { coinData };
};

export default useGetCoins;
