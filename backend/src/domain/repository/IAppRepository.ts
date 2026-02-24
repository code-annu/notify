import { AppCreate, App, AppUpdate } from "../entity/app.entity";

export default interface IAppRepository {
  create(data: AppCreate): Promise<App>;
  update(id: string, updates: AppUpdate): Promise<App>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<App | null>;
  findByOwnerId(ownerId: string): Promise<App[]>;
  deleteByOwnerId(ownerId: string): Promise<void>;
}
