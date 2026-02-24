import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import CreateAppUsecase from "../../application/usecase/user_app/CreateAppUsecase";
import GetUsersAppUsecase from "../../application/usecase/user_app/GetUsersAppUsecase";
import GetAppUsecase from "../../application/usecase/user_app/GetAppUsecase";
import UpdateAppUsecase from "../../application/usecase/user_app/UpdateAppUsecase";
import DeleteAppUsecase from "../../application/usecase/user_app/DeleteAppUsecase";
import ToggleAppStateUsecase from "../../application/usecase/user_app/ToggleAppStateUsecase";
import { AuthRequest } from "../middleware/auth.middleware";
import { NextFunction, Response } from "express";
import AppResponse from "../response/AppResponse";
import { BadRequestError } from "../../domain/error/errors";

@injectable()
export default class AppController {
  constructor(
    @inject(TYPES.CreateAppUsecase) private createAppUsecase: CreateAppUsecase,
    @inject(TYPES.UpdateAppUsecase) private updateAppUsecase: UpdateAppUsecase,
    @inject(TYPES.DeleteAppUsecase) private deleteAppUsecase: DeleteAppUsecase,
    @inject(TYPES.GetAppUsecase) private getAppUsecase: GetAppUsecase,
    @inject(TYPES.GetUsersAppUsecase)
    private getUsersAppUsecase: GetUsersAppUsecase,
    @inject(TYPES.ToggleAppStateUsecase)
    private toggleAppStateUsecase: ToggleAppStateUsecase,
  ) {}

  async postApp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const userId = req.auth!.userId;
      const app = await this.createAppUsecase.execute({
        name,
        description,
        owner_id: userId,
      });
      const response = AppResponse.toSingle(
        app,
        "App created successfully",
        201,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async patchApp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App ID is required");
      }

      const app = await this.updateAppUsecase.execute({
        name,
        description,
        owner_id: userId,
        app_id: appId.toString(),
      });
      const response = AppResponse.toSingle(
        app,
        "App updated successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getApp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App ID is required");
      }

      const app = await this.getAppUsecase.execute({
        userId,
        appId: appId.toString(),
      });
      const response = AppResponse.toSingle(
        app,
        "App fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteApp(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App ID is required");
      }

      await this.deleteAppUsecase.execute({
        userId,
        appId: appId.toString(),
      });
      res.status(200).json({
        message: "App deleted successfully",
        code: 200,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserApps(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const apps = await this.getUsersAppUsecase.execute(userId);
      const response = AppResponse.toList(
        apps,
        "Apps fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async toggleAppState(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App ID is required");
      }

      const app = await this.toggleAppStateUsecase.execute({
        userId,
        appId: appId.toString(),
      });
      const response = AppResponse.toSingle(
        app,
        "App state toggled successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}
