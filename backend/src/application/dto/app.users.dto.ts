export interface AddAppUsersInput {
  userId: string;
  appId: string;
  appUsers: {
    externalId: string;
    email?: string;
    phone?: string;
  }[];
}

export interface AppUserUpdateInput {
  userId: string;
  appUserId: string;
  email?: string;
  phone?: string;
}

export interface DeleteAppUserInput {
  userId: string;
  appUserId: string;
}

export interface ListAppUsersInput {
  userId: string;
  appId: string;
}

export interface AppUserGetInput {
  userId: string;
  appUserId: string;
}

export interface DeleteAppUsersInput {
  userId: string;
  appId: string;
}
