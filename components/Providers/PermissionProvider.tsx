"use client";

import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";

type PermissionProviderProps = {
  children: ReactNode;
  permissions: string | string[];
};

export const PermissionProvider = ({
  children,
  permissions,
}: PermissionProviderProps) => {
  const { user } = useAppSelector((state) => state.Auth);

  if (!user) return null;

  if (user.role.role === "ADMIN") {
    return <>{children}</>;
  }

  const requiredPermissions = Array.isArray(permissions)
    ? permissions
    : [permissions];

  const userPermissions = user.role.rolePermissions.map(
    (rp) => rp.permission.permission
  );

  const hasPermission = requiredPermissions.some((p) =>
    userPermissions.includes(p)
  );

  if (!hasPermission)
    return (
      <div className="text-center font-bold text-2xl text-red-500">
        <p>You do not have permission to view this page!</p>
      </div>
    );

  return <>{children}</>;
};
