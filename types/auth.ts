export interface Role {
  id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  rolePermissions: RolePermission[];
  users: User[];
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;

  role: Role;
  permission: Permission;
}

export interface Permission {
  id: string;
  permission: string;
  created_at: Date;
  updated_at: Date;
  rolePermissions: RolePermission[];
}

export type User = {
  name: string;
  email: string;
  role: Role;
};

export interface AuthSliceState {
  token: string | null;
  user: User | null;
}
