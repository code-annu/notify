import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { SignupPage } from "../features/authentication/pages/SignupPage";
import { HomePage } from "../features/home/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { ProfilePage } from "../features/profile/pages/ProfilePage";

export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
  APPS = "/apps",
  NOTIFICATION = "/notification",
  HELP = "/help",
  SETTING = "/setting",
  DOCUMENTS = "/documents",
  CHAT = "/chat",
  CREATE_CHAT = "/create-chat",
}

export const appRouter = createBrowserRouter([
  // public routes
  { path: AppRoutes.LOGIN, Component: LoginPage },
  { path: AppRoutes.SIGNUP, Component: SignupPage },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: DashboardLayout,
        children: [
          { path: AppRoutes.HOME, Component: HomePage },
          { path: AppRoutes.PROFILE, Component: ProfilePage },
        ],
      },
    ],
  },
]);
