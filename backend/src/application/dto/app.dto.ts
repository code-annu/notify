export interface AppCreateInput {
  owner_id: string;
  name: string;
  description?: string;
}

export interface AppUpdateInput {
  owner_id: string;
  app_id: string;
  name?: string;
  description?: string;
}

export interface AppGetInput {
  userId: string;
  appId: string;
}

export interface AppDeleteInput {
  userId: string;
  appId: string;
}

export interface AppToggleStateInput {
  userId: string;
  appId: string;
}
