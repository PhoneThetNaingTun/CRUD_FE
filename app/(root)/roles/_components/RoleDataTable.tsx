"use client";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useGetRolesQuery } from "@/store/Api/roleSlice";
import { Role } from "@/types/auth";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";

interface Prop {
  columns: ColumnDef<Role>[];
}

export const RoleDataTable = ({ columns }: Prop) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useGetRolesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  if (isLoading)
    return (
      <div className="flex h-96 justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <DataTable
        data={data?.data || []}
        columns={columns}
        setPagination={setPagination}
        pagination={pagination}
        totalPages={data?.totalPages || 0}
      />
    </div>
  );
};
