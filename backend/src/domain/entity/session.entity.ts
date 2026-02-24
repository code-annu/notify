import { User } from "./user.entity";

export interface Session {
  readonly id: string;
  user: User;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface SessionCreate {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface SessionUpdate {
  token: string;
  expiresAt: Date;
}
