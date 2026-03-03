import { deleteRequest } from "../../../service/client/delete-request";
import { getRequest } from "../../../service/client/get-request";
import { patchRequest } from "../../../service/client/patch-request";
import { postRequest } from "../../../service/client/post-request";
import type {
  App,
  AppCreateRequestBody,
  AppList,
  AppListResponse,
  AppResponse,
  AppUpdateRequestBody,
} from "./types";

export abstract class AppsApi {
  static async getMyApps(): Promise<AppList> {
    const response = await getRequest<AppListResponse>("/apps");
    console.log("Data from api: ", response.data);
    return response.data;
  }

  static async getAppById(id: string): Promise<App> {
    const response = await getRequest<AppResponse>(`/apps/${id}`);
    return response.data;
  }

  static async createApp(body: AppCreateRequestBody): Promise<App> {
    const response = await postRequest<AppResponse>("/apps", body);
    return response.data;
  }

  static async updateApp(id: string, body: AppUpdateRequestBody): Promise<App> {
    const response = await patchRequest<AppResponse>(`/apps/${id}`, body);
    return response.data;
  }

  static async deleteApp(id: string): Promise<void> {
    await deleteRequest(`/apps/${id}`);
  }

  
}
