import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppGetInput } from "../../dto/app.dto";
import { App } from "../../../domain/entity/app.entity";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class GetAppUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepo: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(input: AppGetInput): Promise<App> {
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
      throw new ForbiddenError("You are not authorized to access this app");
    }

    return app;
  }
}
