import { ChannelType } from "./app.channel.entity";
import { AppUser } from "./app.user.entity";

export interface AppUserNotificationPreference {
  id: string;
  appUser: AppUser;
  channelType: ChannelType;
  allowed: boolean;
  createdAt: Date;
}

export interface AppUserNotificationPreferenceCreate {
  appUserId: string;
  channelType: ChannelType;
  allowed: boolean;
}

export interface AppUserNotificationPreferenceUpdate {
  allowed: boolean;
}

