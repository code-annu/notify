import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import GetProfileUsecase from "../../application/usecase/profile/GetProfileUsecase";
import DeleteProfileUsecase from "../../application/usecase/profile/DeleteProfileUsecase";
import UpdateProfileUsecase from "../../application/usecase/profile/UpdateProfileUsecase";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import ProfileResponse from "../response/ProfileResponse";

@injectable()
export default class ProfileController {
  constructor(
    @inject(TYPES.GetProfileUsecase)
    private readonly getProfileUsecase: GetProfileUsecase,
    @inject(TYPES.UpdateProfileUsecase)
    private readonly updateProfileUsecase: UpdateProfileUsecase,
    @inject(TYPES.DeleteProfileUsecase)
    private readonly deleteProfileUsecase: DeleteProfileUsecase,
  ) {}

  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await this.getProfileUsecase.execute(req.auth!.userId);
      return res
        .status(200)
        .json(
          ProfileResponse.toSingle(user, "Profile fetched successfully", 200),
        );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await this.updateProfileUsecase.execute(
        req.auth!.userId,
        req.body,
      );
      return res
        .status(200)
        .json(
          ProfileResponse.toSingle(user, "Profile updated successfully", 200),
        );
    } catch (error) {
      next(error);
    }
  }

  async deleteProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await this.deleteProfileUsecase.execute(req.auth!.userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
