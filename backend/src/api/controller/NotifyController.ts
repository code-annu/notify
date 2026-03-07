import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import SendEmailNotificationUsecase from "../../application/usecase/notify/SendEmailNotificationUsecase";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../domain/error/errors";

@injectable()
export default class NotifyController {
  constructor(
    @inject(TYPES.SendEmailNotificationUsecase)
    private readonly sendEmailNotificationUsecase: SendEmailNotificationUsecase,
  ) {}

  async sendEmailNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { userExternalId } = req.body;
      const appId = req.params.appId;
      if (!appId) {
        throw new BadRequestError("App id is required");
      }
      await this.sendEmailNotificationUsecase.execute({
        userExternalId,
        appId: appId.toString(),
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}
