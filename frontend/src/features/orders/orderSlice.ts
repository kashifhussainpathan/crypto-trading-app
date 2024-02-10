import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrder } from "../../models/order.type";

interface IUpdateOrder {
  orderId: string;
  updatedOrder: {
    stopLoss: number;
    takeProfit: number;
  };
}

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/users`;

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    placeOrder: builder.mutation<void, IOrder>({
      query: (order) => ({
        url: "/order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    removeOrder: builder.mutation<void, { id: string; profit: number }>({
      query: ({ id, profit }) => ({
        url: `/order`,
        method: "PATCH",
        body: { id, profit },
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation<void, IUpdateOrder>({
      query: ({ orderId, updatedOrder }) => ({
        url: `/order/${orderId}`,
        method: "PATCH",
        body: updatedOrder,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query<IOrder[], void>({
      query: () => "/order",
      transformResponse: (rawData: { data: IOrder[] }) => rawData.data,
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useRemoveOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
