import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/authentication/pages/LoginPage";
import { SignupPage } from "../features/authentication/pages/SignupPage";
import { HomePage } from "../features/home/HomePage";
export enum AppRoutes {
  LOGIN = "/login",
  SIGNUP = "/signup",
  HOME = "/",
  PROFILE = "/profile",
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
  { path: AppRoutes.HOME, Component: HomePage },
]);
