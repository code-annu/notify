import { Router } from "express";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import NotifyController from "../controller/NotifyController";
import { validateRequestBody } from "../middleware/validate.middleware";
import { sendEmailNotificationSchema } from "../schema/notify.schema";

const notifyRouter = Router();
const notifyController = container.get<NotifyController>(
  TYPES.NotifyController,
);

notifyRouter.post(
  "/:appId/email",
  validateRequestBody(sendEmailNotificationSchema),
  notifyController.sendEmailNotification.bind(notifyController),
);

export default notifyRouter;
