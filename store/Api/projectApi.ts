import { Project } from "@/types/project";
import { apiSlice } from "./apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page, limit }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        return { url: `/projects/all?${params.toString()}` };
      },
      providesTags: ["Project"],
    }),
    createProject: builder.mutation<
      any,
      Omit<Project, "id" | "created_at" | "updated_at">
    >({
      query: (payload) => {
        return {
          url: "/projects/create",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
