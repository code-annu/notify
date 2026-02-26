import { inject, injectable } from "inversify";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import { AddAppUsersInput } from "../../dto/app.users.dto";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import {
  ForbiddenError,
  NotFoundError,
  UnprocessableError,
} from "../../../domain/error/errors";
import { AppUser } from "../../../domain/entity/app.user.entity";

const MAX_USERS = 50;
@injectable()
export default class AddAppUsersUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepo: IAppRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: AddAppUsersInput): Promise<AppUser[]> {
    const { appId, appUsers, userId } = input;

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
        "You are not authorized to add users to this app",
      );
    }

    const appExistingUsers = await this.appUserRepo.findByAppId(appId);
    if (
      appExistingUsers.length + appUsers.length > MAX_USERS ||
      appExistingUsers.length >= MAX_USERS
    ) {
      throw new UnprocessableError(
        "App has reached its maximum number of users",
      );
    }

    const createdAppUsers: AppUser[] = [];

    for (const appUser of appUsers) {
      const existingAppUser = await this.appUserRepo.findByExternalIdForApp(
        appUser.externalId,
        appId,
      );
      if (existingAppUser) {
        createdAppUsers.push(existingAppUser);
        continue;
      }
      const createdAppUser = await this.appUserRepo.create({
        externalId: appUser.externalId,
        appId,
        email: appUser.email || null,
        phoneNumber: appUser.phone || null,
      });
      createdAppUsers.push(createdAppUser);
    }

    return createdAppUsers;
  }
}
