import type { NotifyResponse } from "../../../service/api/notify-response";

export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  companyName: string;
  apiKey: string | null;
  createdAt: Date;
}

export interface ProfileResponse extends NotifyResponse<Profile> {}

export interface ProfileUpdateRequestBody {
  firstName?: string;
  lastName?: string;
  companyName?: string;
}
