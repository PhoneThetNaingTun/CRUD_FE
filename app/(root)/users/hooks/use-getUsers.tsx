import { useGetRolesQuery } from "@/store/Api/roleSlice";
import { useState } from "react";

export const useGetRoles = (initialPage: number, limit: number) => {
  const [page, setPage] = useState(initialPage);

  const { data, isLoading } = useGetRolesQuery({
    page,
    limit,
  });

  const handleNext = () => {
    if (data && page < data.totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    roles: data?.data || [],
    isLoading,
    totalPages: data?.totalPages ?? 1,
    handleNext,
    handlePrevious,
    page,
  };
};
