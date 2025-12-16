import * as z from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(1, "Product name is required")
    .max(50, "Product name must be less than 50 characters"),
  price: z.number().min(1),
  description: z.string().max(500).optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
