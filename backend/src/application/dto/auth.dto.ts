import { Session } from "../../domain/entity/session.entity";

export interface SignupInput {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  companyName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RefreshTokenInput {
  token: string;
}
