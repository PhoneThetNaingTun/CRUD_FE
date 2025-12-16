import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "@/config/config";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: config.API_URL }),
  endpoints: (builder) => ({}),
  tagTypes: ["Product"],
});
