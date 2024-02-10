import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  livePrices: {},
  assets: [],
  highlightedRows: [],
};

export const assetsSlice = createSlice({
  name: "assetsSlice",
  initialState,
  reducers: {
    setLivePrices: (state, action) => {
      state.livePrices = { ...state.livePrices, ...action.payload };
    },
    setAssets: (state, action) => {
      return { ...state, assets: action.payload };
    },

    setHighlightedRows: (state, action) => {
      return { ...state, highlightedRows: action.payload };
    },
  },
});

export const { setLivePrices, setAssets, setHighlightedRows } =
  assetsSlice.actions;

export default assetsSlice.reducer;
