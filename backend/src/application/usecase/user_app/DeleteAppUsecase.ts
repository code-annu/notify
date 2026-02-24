import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppDeleteInput } from "../../dto/app.dto";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class DeleteAppUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepository: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(input: AppDeleteInput) {
    const { userId, appId } = input;
    const user = await this.userRepository.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }
    const app = await this.appRepository.findById(appId);
    if (!app) {
      throw new NotFoundError("App not found");
    }
    if (app.owner.id !== userId) {
      throw new ForbiddenError("You are not authorized to delete this app");
    }
    await this.appRepository.delete(appId);
  }
}
