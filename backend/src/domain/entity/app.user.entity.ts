interface App {
  id: string;
  ownerId: string;
  name: string;
  active: boolean;
  description: string | null;
  createdAt: Date;
}

export interface AppUser {
  id: string;
  externalId: string;
  app: App;
  isActive: boolean;
  email: string | null;
  phoneNumber: string | null;
  createdAt: Date;
}

export interface AppUserCreate {
  externalId: string;
  appId: string;
  email: string | null;
  phoneNumber: string | null;
}

export interface AppUserUpdate {
  isActive: boolean;
  email: string | null;
  phoneNumber: string | null;
}
