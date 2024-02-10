import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/user/userSlice";
import { orderApi } from "../features/orders/orderSlice";
import assetsReducer from "../features/assets/assetsSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  // @ts-ignore
  middleware: (mid) => [...mid(), userApi.middleware, orderApi.middleware],
});
