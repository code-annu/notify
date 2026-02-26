import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import { NotFoundError, ForbiddenError } from "../../../domain/error/errors";
import type IAppChannelRepository from "../../../domain/repository/IAppChannelRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { DeleteAppChannelInput } from "../../dto/app.channel.dto";

@injectable()
export default class DeleteAppChannelUsecase {
  constructor(
    @inject(TYPES.IAppChannelRepository)
    private appChannelRepo: IAppChannelRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(input: DeleteAppChannelInput): Promise<void> {
    const { appChannelId, userId } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const appChannel = await this.appChannelRepo.findById(appChannelId);
    if (!appChannel) {
      throw new NotFoundError("App channel not found");
    }
    if (appChannel.app.owner.id !== userId) {
      throw new ForbiddenError(
        "You are not authorized to delete channel for this app",
      );
    }

    await this.appChannelRepo.delete(appChannelId);
  }
}
