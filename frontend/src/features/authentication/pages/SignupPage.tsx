import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextInputField } from "../../../components/input/TextInputField";
import { PasswordInputField } from "../../../components/input/PasswordInputField";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { AppRoutes } from "../../../router/router";
import type { SignupRequestBody } from "../data/types";
import useAuth from "../hook/auth-hook";
import { toast } from "react-toastify";

export const SignupPage: React.FC = () => {
  const { signupState, signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupRequestBody>({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: SignupRequestBody) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  useEffect(() => {
    if (signupState.error) {
      toast.error(signupState.error.error.message);
    }

    if (signupState.success) {
      toast.success("Signup successful");
      navigate(AppRoutes.HOME);
    }
  }, [signupState]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Or{" "}
          <Link
            to={AppRoutes.LOGIN}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            log in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TextInputField
                label="First Name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextInputField
                label="Last Name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Doe (Optional)"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <TextInputField
              label="Company Name"
              name="companyName"
              type="text"
              autoComplete="organization"
              required
              placeholder="Acme Inc"
              value={formData.companyName}
              onChange={handleChange}
            />

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
              autoComplete="new-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            <div>
              <PrimaryButton
                type="submit"
                className="w-full"
                isLoading={signupState.loading}
                disabled={signupState.loading}
              >
                Sign up
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
