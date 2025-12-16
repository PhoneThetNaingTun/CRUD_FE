export enum Role {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
  MANAGER = "MANAGER",
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
