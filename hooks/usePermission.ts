import { useAppSelector } from "@/store/hooks";

export const usePermission = (permissions: string | string[]): boolean => {
  const { user } = useAppSelector((state) => state.Auth);

  if (!user) return false;

  if (user.role.role === "ADMIN") return true;

  const required = Array.isArray(permissions) ? permissions : [permissions];

  const userPermissions = user.role.rolePermissions.map(
    (rp) => rp.permission.permission as string
  );

  return required.some((p) => userPermissions.includes(p));
};
