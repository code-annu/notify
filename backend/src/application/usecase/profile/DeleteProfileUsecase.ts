import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/errors";

@injectable()
export default class DeleteProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User profile not found or deleted");
    }
    await this.userRepo.delete(userId);
  }
}
