import { User } from "./user.entity";

export interface App {
  id: string;
  owner: User;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
}

export interface AppCreate {
  ownerId: string;
  name: string;
  description: string | null;
}

export interface AppUpdate {
  name: string;
  description: string | null;
  active: boolean;
}
