"use client";
import { useAppSelector } from "@/store/hooks";
import { Role } from "@/types/auth";
import React from "react";

export const RoleProvider = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: Role | Role[];
}) => {
  const { user } = useAppSelector((state) => state.Auth);

  if (!user) return null;

  if (user.role === Role.ADMIN) {
    return <>{children}</>;
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(user.role))
    return (
      <div className="font-bold text-center text-2xl">
        <p>Access denied!</p>
      </div>
    );

  return <>{children}</>;
};
