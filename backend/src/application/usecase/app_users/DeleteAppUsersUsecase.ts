import { inject, injectable } from "inversify";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { DeleteAppUsersInput } from "../../dto/app.users.dto";
import {
  ForbiddenError,
  NotFoundError,
  UnprocessableError,
} from "../../../domain/error/errors";
import type IAppRepository from "../../../domain/repository/IAppRepository";

@injectable()
export default class DeleteAppUsersUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepo: IAppRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: DeleteAppUsersInput) {
    const { userId, appId } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const app = await this.appRepo.findById(appId);
    if (!app) {
      throw new NotFoundError("App not found");
    }
    if (app.owner.id !== userId) {
      throw new ForbiddenError(
        "You are not authorized to delete users from this app",
      );
    }

    const appExistingUsers = await this.appUserRepo.findByAppId(appId);
    if (appExistingUsers.length === 0) {
      throw new UnprocessableError("App has no users");
    }

    await this.appUserRepo.deleteByAppId(appId);
  }
}
