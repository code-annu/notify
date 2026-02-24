import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import AppController from "../controller/AppController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { appCreateSchema, appUpdateSchema } from "../schema/app.schema";

const appRouter = Router();
const appController = container.get<AppController>(TYPES.AppController);

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

export default appRouter;
