import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AuthController from "../controller/AuthController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { loginSchema, refreshTokenSchema, signupSchema } from "../schema/auth.schema";

const authRouter = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.postSignup.bind(authController),
);
authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.postLogin.bind(authController),
);
authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.postRefreshToken.bind(authController),
);

export default authRouter;
