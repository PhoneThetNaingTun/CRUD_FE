import { apiSlice } from "./apiSlice";

export const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        return { url: `/roles/all?${params.toString()}` };
      },
      providesTags: ["Role"],
    }),
    getRole: builder.query({
      query: ({ id }) => {
        return { url: `/roles/${id}` };
      },
    }),
    createRole: builder.mutation({
      query: (payload) => {
        return {
          url: "/roles/create",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query: (payload) => {
        return {
          url: `/roles/${payload.id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/roles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  useGetRoleQuery,
} = roleApi;
