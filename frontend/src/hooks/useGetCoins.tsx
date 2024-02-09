import { useEffect, useState } from "react";
import { IAsset } from "../models/assets.type";

const useGetCoins = () => {
  const [coinData, setCoinData] = useState<IAsset[]>([]);

  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.data.sort(
          (a: IAsset, b: IAsset) => +b.volumeUsd24Hr - +a.volumeUsd24Hr
        );
        setCoinData(sortedData);
      })
      .catch((error) => console.error(error));
  }, []);
  return { coinData };
};

export default useGetCoins;
