import { AppChannel } from "../../domain/entity/app.channel.entity";

export default abstract class AppChannelResponse {
  static toSingle(appChannel: AppChannel, message: string, code: number) {
    return {
      status: "success",
      code,
      message,
      data: this.filterData(appChannel),
    };
  }

  static toList(appChannels: AppChannel[], message: string, code: number) {
    return {
      status: "success",
      code,
      message,
      data: {
        appChannels: appChannels.map((appChannel) =>
          this.filterData(appChannel),
        ),
        total: appChannels.length,
      },
    };
  }

  private static filterData(appChannel: AppChannel) {
    const app = appChannel.app;
    const user = app.owner;
    return {
      id: appChannel.id,
      channelType: appChannel.channelType,
      channelName: appChannel.channelName,
      active: appChannel.active,
      createdAt: appChannel.createdAt,
      app: {
        id: app.id,
        name: app.name,
        description: app.description,
        active: app.active,
        owner: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    };
  }
}
