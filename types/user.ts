import { Role } from "./auth";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  role_id: string;
  created_at: Date;
}
