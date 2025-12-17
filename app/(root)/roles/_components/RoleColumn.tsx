"use client";

import { Role } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import { RoleCellAction } from "./RoleCellAction";

export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "role",
    header: "Role Name",
  },

  {
    accessorKey: "created_at",
    header: "Created Date",
    cell: ({ row }) => (
      <p>{new Date(row.original.created_at).toLocaleDateString("en-US")}</p>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => <RoleCellAction data={row.original} />,
  },
];
