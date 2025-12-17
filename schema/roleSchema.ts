import * as z from "zod";
export const roleSchema = z.object({
  role: z.string(),
  permissionIds: z.array(z.string()),
});

export type RoleSchema = z.infer<typeof roleSchema>;
