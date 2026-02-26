import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppChannelRepository from "../../../domain/repository/IAppChannelRepository";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppChannel } from "../../../domain/entity/app.channel.entity";
import { GetAppChannelsInput } from "../../dto/app.channel.dto";
import {
  ForbiddenError,
  NotFoundError,
} from "../../../domain/error/errors";

@injectable()
export default class GetAppChannelsUsecase {
  constructor(
    @inject(TYPES.IAppChannelRepository)
    private readonly appChannelRepo: IAppChannelRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepo: IAppRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: GetAppChannelsInput): Promise<AppChannel[]> {
    const { appId, userId } = input;

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
        "You are not authorized to get channels for this app",
      );
    }

    const appChannels = await this.appChannelRepo.findByAppId(appId);
    return appChannels;
  }
}
