import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AppUserController from "../controller/AppUserController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { updateAppUserSchema } from "../schema/app.user.schema";

const appUserRouter = Router();
const appUserController = container.get<AppUserController>(
  TYPES.AppUserController,
);

appUserRouter.get(
  "/:appUserId",
  appUserController.getAppUser.bind(appUserController),
);

appUserRouter.patch(
  "/:appUserId",
  validateRequestBody(updateAppUserSchema),
  appUserController.updateAppUser.bind(appUserController),
);

appUserRouter.delete(
  "/:appUserId",
  appUserController.deleteAppUser.bind(appUserController),
);

export default appUserRouter;
