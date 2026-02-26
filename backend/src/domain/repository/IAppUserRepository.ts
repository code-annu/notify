import {
  AppUserCreate,
  AppUser,
  AppUserUpdate,
} from "../entity/app.user.entity";

export default interface IAppUserRepository {
  create(appUser: AppUserCreate): Promise<AppUser>;

  update(id: string, updates: AppUserUpdate): Promise<AppUser>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<AppUser | null>;
  findByExternalIdForApp(
    externalId: string,
    appId: string,
  ): Promise<AppUser | null>;
  findByAppId(appId: string): Promise<AppUser[]>;
  deleteByAppId(appId: string): Promise<void>;
}
