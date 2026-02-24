import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { AppCreateInput } from "../../dto/app.dto";
import {
  NotFoundError,
  UnprocessableError,
} from "../../../domain/error/errors";

@injectable()
export default class CreateAppUsecase {
  constructor(
    @inject(TYPES.IAppRepository) private appRepo: IAppRepository,
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(input: AppCreateInput) {
    const { owner_id, name, description } = input;

    const owner = await this.userRepo.findById(owner_id);
    if (!owner || owner.isDeleted) {
      throw new NotFoundError("Owner not found");
    }

    const userApps = await this.appRepo.findByOwnerId(owner_id);
    if (userApps.length >= 3) {
      throw new UnprocessableError("You can only create 3 apps");
    }

    const app = await this.appRepo.create({
      ownerId: owner_id,
      name,
      description: description || null,
    });

    return app;
  }
}
