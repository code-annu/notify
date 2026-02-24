import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { App } from "../../../domain/entity/app.entity";
import { NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class GetUsersAppUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepo: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(userId: string): Promise<App[]> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const apps = await this.appRepo.findByOwnerId(userId);
    return apps;
  }
}
