import { Product } from "@/types/product";
import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        return { url: `/products/all?${params.toString()}` };
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<any, Omit<Product, "id" | "created_at">>({
      query: (payload) => {
        return {
          url: "/products/create",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<any, Omit<Product, "created_at">>({
      query: (payload) => {
        return {
          url: `/products/${payload.id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
