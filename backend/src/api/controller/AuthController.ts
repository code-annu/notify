import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import LoginUsecase from "../../application/usecase/authentication/LoginUsecase";
import RefreshTokenUsecase from "../../application/usecase/authentication/RefreshTokenUsecase";
import SignupUsecase from "../../application/usecase/authentication/SignupUsecase";
import { Request, Response, NextFunction } from "express";
import AuthResponse from "../response/AuthResponse";

@injectable()
export default class AuthController {
  constructor(
    @inject(TYPES.SignupUsecase) private readonly signupUsecase: SignupUsecase,
    @inject(TYPES.LoginUsecase) private readonly loginUsecase: LoginUsecase,
    @inject(TYPES.RefreshTokenUsecase)
    private readonly refreshTokenUsecase: RefreshTokenUsecase,
  ) {}

  async postSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, companyName } = req.body;
      const { session, accessToken } = await this.signupUsecase.execute({
        email,
        password,
        firstName,
        lastName,
        companyName,
      });
      return res
        .status(201)
        .json(
          AuthResponse.toSingle(
            session,
            accessToken,
            "User signed up successfully",
            201,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { session, accessToken } = await this.loginUsecase.execute({
        email,
        password,
      });
      return res
        .status(200)
        .json(
          AuthResponse.toSingle(
            session,
            accessToken,
            "User logged in successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async postRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const { session, accessToken } = await this.refreshTokenUsecase.execute({
        token,
      });
      return res
        .status(200)
        .json(
          AuthResponse.toSingle(
            session,
            accessToken,
            "Token refreshed successfully",
            200,
          ),
        );
    } catch (error) {
      next(error);
    }
  }
}
