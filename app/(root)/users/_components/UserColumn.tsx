"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { UserCellAction } from "./UserCellAction";
import { UserStatusCellAction } from "./UserStatusCellAction";

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
    cell: ({ row }) => <p>{row.original?.role && row.original.role.role}</p>,
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
    cell: ({ row }) =>
      row.original.status ? (
        <UserCellAction data={row.original} />
      ) : (
        <UserStatusCellAction data={row.original} />
      ),
  },
];
