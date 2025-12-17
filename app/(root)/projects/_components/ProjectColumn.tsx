"use client";

import { Project } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => (
      <p>{new Date(row.original.start_date).toLocaleDateString("en-US")}</p>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => (
      <p>{new Date(row.original.end_date).toLocaleDateString("en-US")}</p>
    ),
  },

  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => (
      <p>{new Date(row.original.created_at).toLocaleDateString("en-US")}</p>
    ),
  },
];
