import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import AddAppUsersUsecase from "../../application/usecase/app_users/AddAppUsersUsecase";
import UpdateAppUserUsecase from "../../application/usecase/app_users/UpdateAppUserUsecase";
import DeleteAppUsersUsecase from "../../application/usecase/app_users/DeleteAppUsersUsecase";
import DeleteAppUserUsecase from "../../application/usecase/app_users/DeleteAppUserUsecase";
import GetAppUsersUsecase from "../../application/usecase/app_users/GetAppUsersUsecase";
import GetAppUserUsecase from "../../application/usecase/app_users/GetAppUserUsecase";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response, NextFunction } from "express";
import { BadRequestError } from "../../domain/error/errors";
import AppUserResponse from "../response/AppUserResponse";

@injectable()
export default class AppUserController {
  constructor(
    @inject(TYPES.AddAppUsersUsecase)
    private readonly addAppUsersUsecase: AddAppUsersUsecase,
    @inject(TYPES.UpdateAppUserUsecase)
    private readonly updateAppUserUsecase: UpdateAppUserUsecase,
    @inject(TYPES.DeleteAppUserUsecase)
    private readonly deleteAppUserUsecase: DeleteAppUserUsecase,
    @inject(TYPES.GetAppUsersUsecase)
    private readonly getAppUsersUsecase: GetAppUsersUsecase,
    @inject(TYPES.GetAppUserUsecase)
    private readonly getAppUserUsecase: GetAppUserUsecase,
    @inject(TYPES.DeleteAppUsersUsecase)
    private readonly deleteAppUsersUsecase: DeleteAppUsersUsecase,
  ) {}

  async postAppUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appId } = req.params;
      const { appUsers } = req.body;
      if (!appId) {
        throw new BadRequestError("App id required");
      }
      const result = await this.addAppUsersUsecase.execute({
        userId,
        appId: appId.toString(),
        appUsers,
      });
      const response = AppUserResponse.toList(
        result,
        "App users added successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateAppUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appUserId } = req.params;
      const { email, phone } = req.body;
      if (!appUserId) {
        throw new BadRequestError("App user id required");
      }
      const result = await this.updateAppUserUsecase.execute({
        userId,
        appUserId: appUserId.toString(),
        email,
        phone,
      });
      const response = AppUserResponse.toSingle(
        result,
        "App user updated successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appUserId } = req.params;
      if (!appUserId) {
        throw new BadRequestError("App user id required");
      }
      await this.deleteAppUserUsecase.execute({
        userId,
        appUserId: appUserId.toString(),
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getAppUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appUserId } = req.params;
      if (!appUserId) {
        throw new BadRequestError("App user id required");
      }
      const result = await this.getAppUserUsecase.execute({
        userId,
        appUserId: appUserId.toString(),
      });
      const response = AppUserResponse.toSingle(
        result,
        "App user fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAppUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appId } = req.params;
      if (!appId) {
        throw new BadRequestError("App id required");
      }
      const result = await this.getAppUsersUsecase.execute({
        userId,
        appId: appId.toString(),
      });
      const response = AppUserResponse.toList(
        result,
        "App users fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appId } = req.params;
      if (!appId) {
        throw new BadRequestError("App id required");
      }
      await this.deleteAppUsersUsecase.execute({
        userId,
        appId: appId.toString(),
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
