import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { ListAppUsersInput } from "../../dto/app.users.dto";
import { AppUser } from "../../../domain/entity/app.user.entity";

@injectable()
export default class GetAppUsersUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepo: IAppUserRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepo: IAppRepository,
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: ListAppUsersInput): Promise<AppUser[]> {
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
      throw new ForbiddenError("You are not authorized to get app users");
    }

    const appUsers = await this.appUserRepo.findByAppId(appId);
    return appUsers;
  }
}
