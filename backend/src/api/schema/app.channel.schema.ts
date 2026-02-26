import { z } from "zod";
import { ChannelType } from "../../domain/entity/app.channel.entity";

export const appChannelCreateSchema = z.object({
  channelType: z.enum(ChannelType, { error: "channelType is required" }),
  channelName: z
    .string("channelName is required")
    .min(3, "channelName must be at least 3 characters long")
    .max(50, "channelName must be at most 50 characters long"),
});
