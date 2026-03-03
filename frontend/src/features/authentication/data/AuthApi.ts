import { postRequest } from "../../../service/client/post-request";
import type {
  AuthResponse,
  AuthUser,
  LoginRequestBody,
  SignupRequestBody,
} from "./types";

export abstract class AuthApi {
  public static async signup(
    credentials: SignupRequestBody,
  ): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/signup",
      credentials,
    );
    return response.data;
  }

  public static async login(credentials: LoginRequestBody): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  }

  public static async refreshToken(token: string): Promise<AuthUser> {
    const response = await postRequest<AuthResponse>("/auth/refresh-token", {
      token,
    });
    return response.data;
  }
}
