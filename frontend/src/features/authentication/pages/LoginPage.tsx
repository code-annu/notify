import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInputField } from "../../../components/input/TextInputField";
import { PasswordInputField } from "../../../components/input/PasswordInputField";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { AppRoutes } from "../../../router/router";
import useAuth from "../hook/auth-hook";
import type { LoginRequestBody } from "../data/types";
import { toast } from "react-toastify";

export const LoginPage: React.FC = () => {
  const { loginState, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequestBody>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  useEffect(() => {
    if (loginState.success) {
      toast.success("Login successful");
      navigate(AppRoutes.HOME);
    }
  }, [loginState]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to={AppRoutes.SIGNUP}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <TextInputField
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordInputField
              label="Password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-900 font-medium"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <PrimaryButton
                type="submit"
                className="w-full"
                isLoading={loginState.loading}
                disabled={loginState.loading}
              >
                Log in
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
