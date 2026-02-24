import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppUpdateInput } from "../../dto/app.dto";
import { App } from "../../../domain/entity/app.entity";
import {
  ForbiddenError,
  NotFoundError,
  UnprocessableError,
} from "../../../domain/error/errors";

@injectable()
export default class UpdateAppUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepo: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(input: AppUpdateInput): Promise<App> {
    const { owner_id, app_id, name, description } = input;

    const owner = await this.userRepo.findById(owner_id);
    if (!owner || owner.isDeleted) {
      throw new NotFoundError("Owner not found");
    }

    const app = await this.appRepo.findById(app_id);
    if (!app) {
      throw new NotFoundError("App not found");
    }
    if (app.owner.id !== owner_id) {
      throw new ForbiddenError("You are not authorized to update this app");
    }
    if (!app.active) {
      throw new UnprocessableError("App is not active");
    }

    const updatedApp = await this.appRepo.update(app_id, {
      name: name || app.name,
      description: description || app.description,
      active: app.active,
    });

    return updatedApp;
  }
}
