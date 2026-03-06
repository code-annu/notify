import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  AppUserAddRequest,
  AppUserList,
  AppUserListResponse,
} from "./types";

export abstract class AppUserApi {
  static async addAppUsers(
    appId: string,
    data: AppUserAddRequest,
  ): Promise<AppUserList> {
    const response = await postRequest<AppUserListResponse>(
      `/apps/${appId}/users`,
      data,
    );
    return response.data;
  }

  static async getAppUsers(appId: string): Promise<AppUserList> {
    const response = await getRequest<AppUserListResponse>(
      `/apps/${appId}/users/`,
    );
    return response.data;
  }

  static async deleteUser(appUserId: string) {
    await deleteRequest(`/app-users/${appUserId}`);
  }
}
