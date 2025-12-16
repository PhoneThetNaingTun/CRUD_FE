import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyGetMeQuery } =
  authApi;
