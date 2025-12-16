import { User } from "@/types/user";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        return { url: `/users/all?${params.toString()}` };
      },
      providesTags: ["User"],
    }),
    createUser: builder.mutation<any, Omit<User, "id" | "created_at">>({
      query: (payload) => {
        return {
          url: "/users/create",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<any, Omit<User, "created_at">>({
      query: (payload) => {
        return {
          url: `/users/${payload.id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
