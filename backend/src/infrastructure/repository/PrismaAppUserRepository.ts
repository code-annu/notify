import { injectable } from "inversify";
import IAppUserRepository from "../../domain/repository/IAppUserRepository";
import {
  AppUserCreate,
  AppUser,
  AppUserUpdate,
} from "../../domain/entity/app.user.entity";
import { PrismaClient } from "../../generated/prisma";
import AppUserMapper from "../mapper/app.user.mapper";
import { prisma } from "../../config/prisma.client";

@injectable()
export default class PrismaAppUserRepository implements IAppUserRepository {
  private db: PrismaClient;
  constructor() {
    this.db = prisma;
  }

  async create(data: AppUserCreate): Promise<AppUser> {
    const { externalId, appId, email, phoneNumber } = data;
    const appUser = await this.db.appUser.create({
      data: {
        external_id: externalId,
        app_id: appId,
        email,
        phone_number: phoneNumber,
        fullname: data.fullname,
      },
      include: { app: true },
    });
    return AppUserMapper.toEntity(appUser);
  }

  async update(id: string, updates: AppUserUpdate): Promise<AppUser> {
    const appUser = await this.db.appUser.update({
      where: { id },
      data: {
        email: updates.email,
        phone_number: updates.phoneNumber,
        is_active: updates.isActive,
      },
      include: { app: true },
    });
    return AppUserMapper.toEntity(appUser);
  }

  async delete(id: string): Promise<void> {
    await this.db.appUser.delete({ where: { id } });
  }

  async findById(id: string): Promise<AppUser | null> {
    const appUser = await this.db.appUser.findUnique({
      where: { id },
      include: { app: true },
    });
    return appUser ? AppUserMapper.toEntity(appUser) : null;
  }

  async findByExternalIdForApp(
    externalId: string,
    appId: string,
  ): Promise<AppUser | null> {
    const appUser = await this.db.appUser.findUnique({
      where: { app_id_external_id: { app_id: appId, external_id: externalId } },
      include: { app: true },
    });
    return appUser ? AppUserMapper.toEntity(appUser) : null;
  }

  async findByAppId(appId: string): Promise<AppUser[]> {
    const appUsers = await this.db.appUser.findMany({
      where: { app_id: appId },
      include: { app: true },
    });
    return appUsers.map(AppUserMapper.toEntity);
  }

  async deleteByAppId(appId: string): Promise<void> {
    await this.db.appUser.deleteMany({ where: { app_id: appId } });
  }
}
