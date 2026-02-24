import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { User } from "../../../domain/entity/user.entity";
import { NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class GetProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User profile not found or deleted");
    }
    return user;
  }
}
