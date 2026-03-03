import type { NotifyResponse } from "../../../service/api/notify-response";


// Model
interface AppOwner {
  id: string;
  firstName: string;
  lastName: string | null;
}

export interface App {
  id: string;
  name: string;
  description: string;
  active: boolean;
  owner: AppOwner;
  createdAt: string;
  updatedAt: string;
}

export interface AppList {
  apps: App[];
  total: number;
}



// Response
export interface AppListResponse extends NotifyResponse<AppList> {}
export interface AppResponse extends NotifyResponse<App> {}
// Request Body
export interface AppCreateRequestBody {
  name: string;
  description?: string;
}

export interface AppUpdateRequestBody {
  name?: string;
  description?: string;
}
