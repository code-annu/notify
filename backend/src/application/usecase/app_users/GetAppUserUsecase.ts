import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppUserGetInput } from "../../dto/app.users.dto";
import { AppUser } from "../../../domain/entity/app.user.entity";

@injectable()
export default class GetAppUserUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: AppUserGetInput): Promise<AppUser> {
    const { userId, appUserId } = input;

    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const appUser = await this.appUserRepo.findById(appUserId);
    if (!appUser) {
      throw new NotFoundError("App user not found");
    }
    if (appUser.app.ownerId !== userId) {
      throw new ForbiddenError("You are not authorized to get this app user");
    }

    return appUser;
  }
}
