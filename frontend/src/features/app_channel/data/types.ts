import type { NotifyResponse } from "../../../service/api/notify-response";

// Enum
export enum ChannelType {
  SMS = "sms",
  EMAIL = "email",
  PUSH = "push",
}

// Model
export interface AppChannel {
  id: string;
  channelType: ChannelType;
  channelName: string;
  createdAt: Date;
  app: {
    id: string;
    name: string;
    active: boolean;
  };
}

export interface AppChannelList {
  appChannels: AppChannel[];
  total: number;
}

// Response
export interface AppChannelListResponse extends NotifyResponse<AppChannelList> {}
export interface AppChannelResponse extends NotifyResponse<AppChannel> {}

// Request Body
export interface AppChannelCreateRequestBody {
  channelType: ChannelType;
  channelName: string;
}

export interface AppChannelUpdateRequestBody {
  channelType: ChannelType;
  channelName: string;
}
