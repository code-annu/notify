import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import ProfileController from "../controller/ProfileController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { profileUpdateSchema } from "../schema/profile.schema";

const profileRouter = Router();
const profileController = container.get<ProfileController>(
  TYPES.ProfileController,
);

profileRouter.get("/", profileController.getProfile.bind(profileController));
profileRouter.patch(
  "/",
  validateRequestBody(profileUpdateSchema),
  profileController.updateProfile.bind(profileController),
);
profileRouter.delete(
  "/",
  profileController.deleteProfile.bind(profileController),
);

export default profileRouter;
