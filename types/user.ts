import { Role } from "./auth";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: Date;
}
