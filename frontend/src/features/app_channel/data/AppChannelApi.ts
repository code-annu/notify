import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  AppChannel,
  AppChannelCreateRequestBody,
  AppChannelList,
  AppChannelListResponse,
  AppChannelResponse,
} from "./types";

export abstract class AppChannelApi {
  static async getAppChannels(appId: string): Promise<AppChannelList> {
    const response = await getRequest<AppChannelListResponse>(
      `/apps/${appId}/channels`,
    );
    return response.data;
  }

  static async createAppChannel(
    appId: string,
    body: AppChannelCreateRequestBody,
  ): Promise<AppChannel> {
    const response = await postRequest<AppChannelResponse>(
      `/apps/${appId}/channels`,
      body,
    );
    return response.data;
  }

  static async getChannelById(channelId: string): Promise<AppChannel> {
    const response = await getRequest<AppChannelResponse>(
      `/app-channels/${channelId}`,
    );
    return response.data;
  }

  static async deleteAppChannel(channelId: string): Promise<void> {
    await deleteRequest(`/app-channels/${channelId}`);
  }
}
