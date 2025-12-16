import { Role } from "@/types/auth";
import * as z from "zod";
export const getUserSchema = (update: boolean) =>
  z.object({
    email: z.email("Invalid email address"),
    password: update
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .max(32, "Password must be at most 32 characters"),
    name: z.string(),
    role: z.enum(Role),
  });

export type UserSchema = z.infer<ReturnType<typeof getUserSchema>>;
