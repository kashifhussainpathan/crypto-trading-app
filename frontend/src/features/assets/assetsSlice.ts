import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  livePrices: {},
  assets: [],
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
  },
});

export const { setLivePrices, setAssets } = assetsSlice.actions;

export default assetsSlice.reducer;
