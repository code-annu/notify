import { Router } from "express";
import AppChannelController from "../controller/AppChannelController";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";

const appChannelRouter = Router();
const appChannelController = container.get<AppChannelController>(
  TYPES.AppChannelController,
);


appChannelRouter.get(
  "/:appChannelId",
  appChannelController.getAppChannel.bind(appChannelController),
);

appChannelRouter.delete(
  "/:appChannelId",
  appChannelController.deleteAppChannel.bind(appChannelController),
);

appChannelRouter.patch(
  "/:appChannelId/toggle",
  appChannelController.toggleAppChannelState.bind(appChannelController),
);

export default appChannelRouter;
