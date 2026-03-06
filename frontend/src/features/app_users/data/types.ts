import type { NotifyResponse } from "../../../service/api/notify-response";

export interface AppUser {
  id: string;
  externalId: string;
  email: string;
  phone: string;
  isActive: boolean;
  fullname: string;
  createdAt: Date;
  app: {
    id: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: Date;
  };
}

export interface AppUserList {
  users: AppUser[];
  total: number;
}

export interface AppUserListResponse extends NotifyResponse<AppUserList> {}
export interface AppUserResponse extends NotifyResponse<AppUser> {}

export interface AppUserAddRequest {
  appUsers: {
    externalId: string;
    fullname: string;
    email: string;
    phone: string;
  }[];
}
