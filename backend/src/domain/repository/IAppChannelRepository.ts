import {
  AppChannel,
  AppChannelCreate,
  AppChannelUpdate,
  ChannelType,
} from "../entity/app.channel.entity";

export default interface IAppChannelRepository {
  create(data: AppChannelCreate): Promise<AppChannel>;
  update(id: string, updates: AppChannelUpdate): Promise<AppChannel>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<AppChannel | null>;
  findByAppId(appId: string): Promise<AppChannel[]>;
  deleteByAppId(appId: string): Promise<void>;

  // Methods below need to implement in original repository
  findByAppIdAndType(
    appId: string,
    channelType: ChannelType,
  ): Promise<AppChannel | null>;
}
