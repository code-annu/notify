import type { NotifyResponse } from "../../../service/api/notify-response";

export interface AuthUser {
  user: {
    id: string;
    firstName: string;
    lastName: string | null;
    companyName: string;
  };
  session: {
    id: string;
    refreshToken: string;
    expiresAt: Date;
  };
  accessToken: string;
}

export interface AuthResponse extends NotifyResponse<AuthUser> {}

export interface SignupRequestBody {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  companyName: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
