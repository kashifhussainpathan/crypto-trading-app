import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLivePrices } from "../features/assets/assetsSlice";

const useGetCoinsPrice = () => {
  const dispatch = useDispatch();

  const [highlightedRows, setHighlightedRows] = useState<string[]>([]);
  const [coinPrices, setCoinPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    pricesWs.onmessage = function (event) {
      const data = JSON.parse(event.data);

      setCoinPrices((prevPrices) => ({ ...prevPrices, ...data }));

      dispatch(setLivePrices(data));

      const updatedHighlightedRows = [];
      for (const symbol in data) {
        updatedHighlightedRows.push(symbol);
      }
      setHighlightedRows(updatedHighlightedRows);

      setTimeout(() => {
        setHighlightedRows(() => []);
      }, 1000);
    };

    return () => {
      pricesWs.close();
    };
  }, [coinPrices]);

  return { highlightedRows, coinPrices };
};

export default useGetCoinsPrice;
