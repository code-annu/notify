import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppChannelRepository from "../../../domain/repository/IAppChannelRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppChannel } from "../../../domain/entity/app.channel.entity";
import { ToggleAppChannelStateInput } from "../../dto/app.channel.dto";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class ToggleAppChannelStateUsecase {
  constructor(
    @inject(TYPES.IAppChannelRepository)
    private readonly appChannelRepo: IAppChannelRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: ToggleAppChannelStateInput): Promise<AppChannel> {
    const { appChannelId, userId } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const appChannel = await this.appChannelRepo.findById(appChannelId);
    if (!appChannel) {
      throw new NotFoundError("Channel not found");
    }
    if (appChannel.app.owner.id !== user.id) {
      throw new ForbiddenError("You are not authorized to toggle this channel");
    }

    const updatedAppChannel = await this.appChannelRepo.update(appChannelId, {
      channelName: appChannel.channelName,
      active: !appChannel.active,
    });
    return updatedAppChannel;
  }
}
