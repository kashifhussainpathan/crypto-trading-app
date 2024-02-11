import { IUser } from "../../models/user.type";
import { IOrder } from "../../models/order.type";
import { IUserCard } from "../../components/userCard";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IRefreshTokenResponse {
  refreshToken: string;
  accessToken: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  balance: number;
  orders: IOrder[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  data: LoginResponseData;
  statusCode: number;
  message: string;
  success: boolean;
}

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinbase-backend-kp.vercel.app/api/v1/users",
  }),

  tagTypes: ["user"],

  endpoints: (builder) => ({
    signup: builder.mutation<IUser, {}>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation<LoginResponse, IUser>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),

    logout: builder.mutation<void, { token: string | null }>({
      query: ({ token }) => ({
        url: "/logout",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["user"],
    }),

    getUser: builder.query<IUserCard, { token: string | null }>({
      query: ({ token }) => ({
        url: "/current-user",
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (rawData: { data: IUserCard }) => rawData.data,
      providesTags: ["user"],
    }),

    refreshToken: builder.mutation<IRefreshTokenResponse, string | null>({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body: refreshToken,
      }),
      transformResponse: (rawData: { data: IRefreshTokenResponse }) =>
        rawData.data,
    }),
  }),
});

export const {
  useGetUserQuery,
  useLogoutMutation,
  useSignupMutation,
  useLoginMutation,
  useRefreshTokenMutation,
} = userApi;
