import { apiSlice } from "./apiSlice";

export const permissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => {
        return { url: `/permissions/all` };
      },
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionApi;
