"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { UserCellAction } from "./UserCellAction";

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
    cell: ({ row }) => <UserCellAction data={row.original} />,
  },
];
