import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppToggleStateInput } from "../../dto/app.dto";
import { App } from "../../../domain/entity/app.entity";
import { ForbiddenError, NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class ToggleAppStateUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepository: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
  ) {}

  async execute(input: AppToggleStateInput): Promise<App> {
    const { userId, appId } = input;

    const user = await this.userRepository.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User not found");
    }

    const app = await this.appRepository.findById(appId);
    if (!app) {
      throw new NotFoundError("App not found");
    }
    if (app.owner.id !== user.id) {
      throw new ForbiddenError("You are not authorized to toggle app state");
    }

    const updatedApp = await this.appRepository.update(appId, {
      name: app.name,
      description: app.description,
      active: !app.active,
    });

    return updatedApp;
  }
}
