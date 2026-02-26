import {
  App as PrismaApp,
  AppChannel as PrismaAppChannel,
  User,
} from "../../generated/prisma";
import {
  AppChannel,
  ChannelType,
} from "../../domain/entity/app.channel.entity";
import AppMapper from "./app.mapper";

type PrismaAppChannelWithApp = PrismaAppChannel & {
  app: PrismaApp & { owner: User };
};

export default abstract class AppChannelMapper {
  static toEntity(channel: PrismaAppChannelWithApp): AppChannel {
    return {
      id: channel.id,
      app: AppMapper.toEntity(channel.app),
      channelType: channel.ch_type as ChannelType,
      channelName: channel.ch_name,
      active: channel.active,
      createdAt: channel.created_at,
    };
  }
}
