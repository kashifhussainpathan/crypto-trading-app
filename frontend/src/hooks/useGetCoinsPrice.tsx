import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLivePrices } from "../features/assets/assetsSlice";

const useGetCoinsPrice = () => {
  const dispatch = useDispatch();

  const [highlightedRows, setHighlightedRows] = useState<string[]>([]);
  const [coinPrices, setCoinPrices] = useState<Record<string, number>>({});
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    pricesWs.onmessage = function (event) {
      const data = JSON.parse(event.data);

      setPrevPrices((prev) => {
        const updatedPrev = { ...prev };
        for (const symbol in data) {
          updatedPrev[symbol.toLowerCase()] =
            prev[symbol.toLowerCase()] || data[symbol.toLowerCase()];
        }

        return updatedPrev;
      });

      setCoinPrices((prevPrices) => ({ ...prevPrices, ...data }));

      dispatch(setLivePrices(data));

      const updatedHighlightedRows = [];
      for (const symbol in data) {
        const currentPrice = parseFloat(data[symbol]);
        const prevPrice = prevPrices[symbol] || 0;

        if (currentPrice > prevPrice) {
          updatedHighlightedRows.push(`${symbol}-green`);
        } else if (currentPrice < prevPrice) {
          updatedHighlightedRows.push(`${symbol}-red`);
        }
      }
      setHighlightedRows(updatedHighlightedRows);

      setTimeout(() => {
        setHighlightedRows(() => []);
      }, 1000);
    };

    return () => {
      pricesWs.close();
    };
  }, [prevPrices]);

  return { highlightedRows, coinPrices };
};

export default useGetCoinsPrice;
