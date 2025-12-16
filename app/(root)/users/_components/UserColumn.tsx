"use client";

import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { UserCellAction } from "./UserCellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
