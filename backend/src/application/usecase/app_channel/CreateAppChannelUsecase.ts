import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppChannelRepository from "../../../domain/repository/IAppChannelRepository";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppChannel } from "../../../domain/entity/app.channel.entity";
import { AppChannelCreateInput } from "../../dto/app.channel.dto";
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../../domain/error/errors";

@injectable()
export default class CreateAppChannelUsecase {
  constructor(
    @inject(TYPES.IAppChannelRepository)
    private readonly appChannelRepo: IAppChannelRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepo: IAppRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: AppChannelCreateInput): Promise<AppChannel> {
    const { appId, channelType, channelName, userId } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const app = await this.appRepo.findById(appId);
    if (!app) {
      throw new NotFoundError("App not found");
    }
    if (app.owner.id !== user.id) {
      throw new ForbiddenError(
        "You are not authorized to create channel for this app",
      );
    }

    const existingChannel = await this.appChannelRepo.findByAppIdAndType(
      appId,
      channelType,
    );
    if (existingChannel) {
      throw new ConflictError("Channel already exists for this app");
    }

    const appChannel = await this.appChannelRepo.create({
      appId,
      channelType,
      channelName,
    });

    return appChannel;
  }
}
