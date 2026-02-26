import { AppUser } from "../../domain/entity/app.user.entity";

export default abstract class AppUserResponse {
  static toSingle(appUser: AppUser, message: string, code: number) {
    return {
      status: "success",
      code,
      message,
      data: this.filterData(appUser),
    };
  }
  static toList(appUsers: AppUser[], message: string, code: number) {
    return {
      status: "success",
      code,
      message,
      data: {
        users: appUsers.map((appUser) => this.filterData(appUser)),
        total: appUsers.length,
      },
    };
  }

  private static filterData(appUser: AppUser) {
    const app = appUser.app;
    return {
      id: appUser.id,
      externalId: appUser.externalId,
      email: appUser.email,
      phone: appUser.phoneNumber,
      isActive: appUser.isActive,
      createdAt: appUser.createdAt,
      app: {
        id: app.id,
        name: app.name,
        description: app.description,
        active: app.active,
        createdAt: app.createdAt,
      },
    };
  }
}
