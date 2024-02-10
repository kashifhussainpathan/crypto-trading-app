import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setHighlightedRows,
  setLivePrices,
} from "../features/assets/assetsSlice";

const useGetCoinsPrice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    pricesWs.onmessage = function (event) {
      const data = JSON.parse(event.data);

      dispatch(setLivePrices(data));

      const updatedHighlightedRows = [];
      for (const symbol in data) {
        updatedHighlightedRows.push(symbol);
      }
      dispatch(setHighlightedRows(updatedHighlightedRows));

      setTimeout(() => {
        dispatch(setHighlightedRows([]));
      }, 1000);
    };

    return () => {
      pricesWs.close();
    };
  }, []);
};

export default useGetCoinsPrice;
