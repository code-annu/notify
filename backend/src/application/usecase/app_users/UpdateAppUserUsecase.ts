import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppUserUpdateInput } from "../../dto/app.users.dto";
import app from "../../../app";

@injectable()
export default class UpdateAppUserUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: AppUserUpdateInput) {
    const { userId, appUserId, email, phone, fullname } = input;

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
        "You are not authorized to update this app user",
      );
    }

    const updatedUser = await this.appUserRepo.update(appUserId, {
      email: email || appUser.email,
      phoneNumber: phone || appUser.phoneNumber,
      isActive: appUser.isActive,
      fullname: fullname || appUser.fullname,
    });

    return updatedUser;
  }
}
