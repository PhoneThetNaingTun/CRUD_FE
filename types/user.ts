import { Role } from "./auth";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: Role;
  role_id?: string;
  status: boolean;
  created_at: Date;
}
