import { App } from "./app.entity";

export enum ChannelType {
  EMAIL = "email",
  SMS = "sms",
  PUSH = "push",
}

export interface AppChannel {
  id: string;
  app: App;
  channelType: ChannelType;
  channelName: string;
  active: boolean;
  createdAt: Date;
}

export interface AppChannelCreate {
  appId: string;
  channelType: ChannelType;
  channelName: string;
}

export interface AppChannelUpdate {
  channelName: string;
  active: boolean;
}
