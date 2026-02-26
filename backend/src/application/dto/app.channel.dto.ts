import { ChannelType } from "../../domain/entity/app.channel.entity";

export interface AppChannelCreateInput {
  userId: string;
  appId: string;
  channelType: ChannelType;
  channelName: string;
}

export interface GetAppChannelsInput {
  userId: string;
  appId: string;
}

export interface GetAppChannelInput {
  userId: string;
  appChannelId: string;
}

export interface ToggleAppChannelStateInput {
  userId: string;
  appChannelId: string;
}

export interface DeleteAppChannelInput {
  userId: string;
  appChannelId: string;
}
