import * as z from "zod";
export const userStatusSchema = z.object({
  role_id: z.string(),
});

export type UserStatusSchema = z.infer<typeof userStatusSchema>;
