import * as z from "zod";
export const roleSchema = z.object({
  role: z.string(),
  rolePermissions: z.array(
    z.object({
      permission: z.object({ id: z.string() }),
    })
  ),
});

export type RoleSchema = z.infer<typeof roleSchema>;
