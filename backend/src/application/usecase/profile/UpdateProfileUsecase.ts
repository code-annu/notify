import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { User } from "../../../domain/entity/user.entity";
import { NotFoundError } from "../../../domain/error/errors";
import { ProfileUpdateInput } from "../../dto/profile.dto";

@injectable()
export default class UpdateProfileUsecase {
  constructor(
    @inject(TYPES.IUserRepository) private userRepo: IUserRepository,
  ) {}

  async execute(userId: string, updates: ProfileUpdateInput): Promise<User> {
    const { firstName, lastName, companyName, apiKey } = updates;
    const user = await this.userRepo.findById(userId);
    if (!user || user.isDeleted) {
      throw new NotFoundError("User profile not found or deleted");
    }
    const updatedUser = await this.userRepo.update(userId, {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      companyName: companyName || user.companyName,
      apiKey: apiKey || user.apiKey,
    });

    return updatedUser;
  }
}
