import { prisma } from "../../config/prisma.client";
import {
  AppChannel,
  AppChannelCreate,
  AppChannelUpdate,
  ChannelType,
} from "../../domain/entity/app.channel.entity";
import IAppChannelRepository from "../../domain/repository/IAppChannelRepository";
import { PrismaClient } from "../../generated/prisma";
import AppChannelMapper from "../mapper/app.channel.mapper";

export default class PrismaAppChannelRepository implements IAppChannelRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  async create(data: AppChannelCreate): Promise<AppChannel> {
    const channel = await this.db.appChannel.create({
      data: {
        app_id: data.appId,
        ch_type: data.channelType,
        ch_name: data.channelName,
      },
      include: { app: { include: { owner: true } } },
    });
    return AppChannelMapper.toEntity(channel);
  }

  async update(id: string, updates: AppChannelUpdate): Promise<AppChannel> {
    const channel = await this.db.appChannel.update({
      where: { id },
      data: {
        ch_name: updates.channelName,
        active: updates.active,
      },
      include: { app: { include: { owner: true } } },
    });
    return AppChannelMapper.toEntity(channel);
  }

  async delete(id: string): Promise<void> {
    await this.db.appChannel.delete({ where: { id } });
  }

  async findById(id: string): Promise<AppChannel | null> {
    const channel = await this.db.appChannel.findUnique({
      where: { id },
      include: { app: { include: { owner: true } } },
    });
    return channel ? AppChannelMapper.toEntity(channel) : null;
  }

  async findByAppId(appId: string): Promise<AppChannel[]> {
    const channels = await this.db.appChannel.findMany({
      where: { app_id: appId },
      include: { app: { include: { owner: true } } },
    });
    return channels.map((channel) => AppChannelMapper.toEntity(channel));
  }

  async deleteByAppId(appId: string): Promise<void> {
    await this.db.appChannel.deleteMany({ where: { app_id: appId } });
  }

  async findByAppIdAndType(
    appId: string,
    channelType: ChannelType,
  ): Promise<AppChannel | null> {
    const channel = await this.db.appChannel.findUnique({
      where: {
        app_id_ch_type: { app_id: appId, ch_type: channelType },
      },
      include: { app: { include: { owner: true } } },
    });
    return channel ? AppChannelMapper.toEntity(channel) : null;
  }
}
