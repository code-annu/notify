import { useState } from "react";
import {
  mapToNotifyError,
  type NotifyError,
} from "../../../util/ErrorHandlerUtil";
import type { LoginRequestBody, SignupRequestBody } from "../data/types";
import { AuthApi } from "../data/AuthApi";
import { StorageUtil } from "../../../util/StorageUtil";

interface LoginState {
  loading: boolean;
  error: NotifyError | null;
  success: boolean;
}

interface SignupState {
  loading: boolean;
  error: NotifyError | null;
  success: boolean;
}

export default function useAuth() {
  const [loginState, setLoginState] = useState<LoginState>({
    loading: false,
    error: null,
    success: false,
  });

  const [signupState, setSignupState] = useState<SignupState>({
    loading: false,
    error: null,
    success: false,
  });

  const login = async (credentials: LoginRequestBody) => {
    try {
      setLoginState({ loading: true, error: null, success: false });
      const response = await AuthApi.login(credentials);
      StorageUtil.saveAccessToken(response.accessToken);
      StorageUtil.saveRefreshToken(response.session.refreshToken);
      setLoginState({ loading: false, error: null, success: true });
    } catch (error) {
      setLoginState({
        loading: false,
        error: mapToNotifyError(error),
        success: false,
      });
    }
  };

  const signup = async (credentials: SignupRequestBody) => {
    try {
      setSignupState({ loading: true, error: null, success: false });
      const response = await AuthApi.signup(credentials);
      StorageUtil.saveAccessToken(response.accessToken);
      StorageUtil.saveRefreshToken(response.session.refreshToken);
      setSignupState({ loading: false, error: null, success: true });
    } catch (error) {
      setSignupState({
        loading: false,
        error: mapToNotifyError(error),
        success: false,
      });
    }
  };

  return { loginState, login, signupState, signup };
}
