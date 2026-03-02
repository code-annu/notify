import type { NotifySingleResponse } from "../../../service/api/notify-response";

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  createdAt: Date;
}

export interface ProfileResponse extends NotifySingleResponse<Profile> {}

export interface ProfileUpdateRequestBody {
  firstName?: string;
  lastName?: string;
  companyName?: string;
}
