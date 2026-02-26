import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import { NotFoundError, ForbiddenError } from "../../../domain/error/errors";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { DeleteAppUserInput } from "../../dto/app.users.dto";

@injectable()
export default class DeleteAppUserUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: DeleteAppUserInput) {
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
      throw new ForbiddenError(
        "You are not authorized to delete this app user",
      );
    }

    await this.appUserRepo.delete(appUserId);
  }
}
