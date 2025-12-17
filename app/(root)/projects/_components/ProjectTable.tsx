"use client";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectsQuery } from "@/store/Api/projectApi";
import { Project } from "@/types/project";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";

interface Prop {
  columns: ColumnDef<Project>[];
}

export const ProjectDataTable = ({ columns }: Prop) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useGetProjectsQuery({
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
