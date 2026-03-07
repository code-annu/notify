import { z } from "zod";

export const sendEmailNotificationSchema = z.object({
  userExternalId: z.string(`'userExternalId' is required`),
});