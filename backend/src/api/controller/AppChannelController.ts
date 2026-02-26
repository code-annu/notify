import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import CreateAppChannelUsecase from "../../application/usecase/app_channel/CreateAppChannelUsecase";
import DeleteAppChannelUsecase from "../../application/usecase/app_channel/DeleteAppChannelUsecase";
import GetAppChannelsUsecase from "../../application/usecase/app_channel/GetAppChannelsUsecase";
import GetAppChannelUsecase from "../../application/usecase/app_channel/GetAppChannelUsecase";
import ToggleAppChannelStateUsecase from "../../application/usecase/app_channel/ToggleAppChannelStateUsecase";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { BadRequestError } from "../../domain/error/errors";
import AppChannelResponse from "../response/AppChannelResponse";

@injectable()
export default class AppChannelController {
  constructor(
    @inject(TYPES.CreateAppChannelUsecase)
    private readonly createAppChannelUsecase: CreateAppChannelUsecase,
    @inject(TYPES.GetAppChannelsUsecase)
    private readonly getAppChannelsUsecase: GetAppChannelsUsecase,
    @inject(TYPES.GetAppChannelUsecase)
    private readonly getAppChannelUsecase: GetAppChannelUsecase,
    @inject(TYPES.ToggleAppChannelStateUsecase)
    private readonly toggleAppChannelStateUsecase: ToggleAppChannelStateUsecase,
    @inject(TYPES.DeleteAppChannelUsecase)
    private readonly deleteAppChannelUsecase: DeleteAppChannelUsecase,
  ) {}

  async postAppChannel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appId } = req.params;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const { channelType, channelName } = req.body;

      const result = await this.createAppChannelUsecase.execute({
        userId: userId,
        appId: appId.toString(),
        channelType,
        channelName,
      });
      const response = AppChannelResponse.toSingle(
        result,
        "App channel created successfully",
        201,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAppChannels(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appId } = req.params;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      const result = await this.getAppChannelsUsecase.execute({
        userId: userId,
        appId: appId.toString(),
      });
      const response = AppChannelResponse.toList(
        result,
        "App channels fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAppChannel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appChannelId } = req.params;
      if (!appChannelId) {
        throw new BadRequestError("App channel id is required");
      }
      const result = await this.getAppChannelUsecase.execute({
        userId: userId,
        appChannelId: appChannelId.toString(),
      });
      const response = AppChannelResponse.toSingle(
        result,
        "App channel fetched successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async toggleAppChannelState(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.auth!.userId;
      const { appChannelId } = req.params;
      if (!appChannelId) {
        throw new BadRequestError("App channel id is required");
      }
      const result = await this.toggleAppChannelStateUsecase.execute({
        userId: userId,
        appChannelId: appChannelId.toString(),
      });
      const response = AppChannelResponse.toSingle(
        result,
        "App channel state toggled successfully",
        200,
      );
      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAppChannel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth!.userId;
      const { appChannelId } = req.params;
      if (!appChannelId) {
        throw new BadRequestError("App channel id is required");
      }
      await this.deleteAppChannelUsecase.execute({
        userId: userId,
        appChannelId: appChannelId.toString(),
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
