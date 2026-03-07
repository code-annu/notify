import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IAppUserRepository from "../../../domain/repository/IAppUserRepository";
import type IAppRepository from "../../../domain/repository/IAppRepository";
import { SendEmailNotificationInput } from "../../dto/notify.dto";
import { NotFoundError } from "../../../domain/error/errors";
import { publishEmail } from "../../../publish/email.publish";

@injectable()
export default class SendEmailNotificationUsecase {
  constructor(
    @inject(TYPES.IAppUserRepository)
    private readonly appUserRepository: IAppUserRepository,
    @inject(TYPES.IAppRepository)
    private readonly appRepository: IAppRepository,
  ) {}

  async execute(input: SendEmailNotificationInput) {
    const { userExternalId, appId } = input;

    const app = await this.appRepository.findById(appId);
    if (!app || !app.active) {
      throw new NotFoundError("App is not found or currently not active");
    }

    const appUser = await this.appUserRepository.findByExternalIdForApp(
      userExternalId,
      appId,
    );
    if (!appUser || !appUser.isActive) {
      throw new NotFoundError("App User is not found or currently not active");
    }

    if (appUser.email) {
      publishEmail({
        to: {
          email: appUser.email,
          name: appUser.fullname,
        },
        subject: "Testing Email",
        text: "This is a test email",
        html: "<h1>This is a test email</h1>",
      });
    }
  }
}
