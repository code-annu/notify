import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AppController from "../controller/AppController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { appCreateSchema, appUpdateSchema } from "../schema/app.schema";
import AppChannelController from "../controller/AppChannelController";
import { appChannelCreateSchema } from "../schema/app.channel.schema";
import AppUserController from "../controller/AppUserController";
import { addAppUsersSchema } from "../schema/app.user.schema";

const appRouter = Router();

const appController = container.get<AppController>(TYPES.AppController);
const appChannelController = container.get<AppChannelController>(
  TYPES.AppChannelController,
);
const appUserController = container.get<AppUserController>(
  TYPES.AppUserController,
);

appRouter.post(
  "/",
  validateRequestBody(appCreateSchema),
  appController.postApp.bind(appController),
);

appRouter.patch(
  "/:appId",
  validateRequestBody(appUpdateSchema),
  appController.patchApp.bind(appController),
);

appRouter.get("/:appId", appController.getApp.bind(appController));

appRouter.delete("/:appId", appController.deleteApp.bind(appController));

appRouter.get("/", appController.getUserApps.bind(appController));

appRouter.patch(
  "/:appId/toggle",
  appController.toggleAppState.bind(appController),
);

// App Channels
appRouter.get(
  "/:appId/channels",
  appChannelController.getAppChannels.bind(appChannelController),
);

appRouter.post(
  "/:appId/channels",
  validateRequestBody(appChannelCreateSchema),
  appChannelController.postAppChannel.bind(appChannelController),
);

// App users
appRouter.get(
  "/:appId/users",
  appUserController.getAppUsers.bind(appUserController),
);

appRouter.post(
  "/:appId/users",
  validateRequestBody(addAppUsersSchema),
  appUserController.postAppUsers.bind(appUserController),
);

appRouter.delete(
  "/:appId/users",
  appUserController.deleteAppUsers.bind(appUserController),
);

export default appRouter;
