import { prisma } from "../../config/prisma.client";
import { App, AppCreate, AppUpdate } from "../../domain/entity/app.entity";
import IAppRepository from "../../domain/repository/IAppRepository";
import { PrismaClient } from "../../generated/prisma";
import AppMapper from "../mapper/app.mapper";

export default class PrismaAppRepository implements IAppRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async create(data: AppCreate): Promise<App> {
    const app = await this.db.app.create({
      data: {
        name: data.name,
        description: data.description,
        owner_id: data.ownerId,
      },
      include: { owner: true },
    });
    return AppMapper.toEntity(app);
  }

  async update(id: string, updates: AppUpdate): Promise<App> {
    const app = await this.db.app.update({
      where: { id },
      data: {
        name: updates.name,
        description: updates.description,
        active: updates.active,
      },
      include: { owner: true },
    });
    return AppMapper.toEntity(app);
  }

  async delete(id: string): Promise<void> {
    await this.db.app.delete({ where: { id } });
  }

  async findById(id: string): Promise<App | null> {
    const app = await this.db.app.findUnique({
      where: { id },
      include: { owner: true },
    });
    return app ? AppMapper.toEntity(app) : null;
  }

  async findByOwnerId(ownerId: string): Promise<App[]> {
    const apps = await this.db.app.findMany({
      where: { owner_id: ownerId },
      include: { owner: true },
    });
    return apps.map((app) => AppMapper.toEntity(app));
  }

  async deleteByOwnerId(ownerId: string): Promise<void> {
    await this.db.app.deleteMany({ where: { owner_id: ownerId } });
  }
}
