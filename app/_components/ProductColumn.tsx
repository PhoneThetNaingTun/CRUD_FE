"use client";

import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ProductCellAction } from "./ProductCellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => row.original.price.toFixed(2),
  },
  {
    accessorKey: "description",
    header: "Description",
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
    cell: ({ row }) => <ProductCellAction data={row.original} />,
  },
];
