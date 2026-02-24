import { App } from "../../domain/entity/app.entity";

export default abstract class AppResponse {
  static toSingle(app: App, message: string, code: number) {
    return {
      message,
      code,
      data: this.filterData(app),
    };
  }

  static toList(apps: App[], message: string, code: number) {
    return {
      message,
      code,
      data: {
        apps: apps.map((app) => this.filterData(app)),
        total: apps.length,
      },
    };
  }

  private static filterData(app: App) {
    const owner = app.owner;

    return {
      id: app.id,
      name: app.name,
      description: app.description,
      active: app.active,
      owner: {
        id: owner.id,
        firstName: owner.firstName,
        lastName: owner.lastName,
      },
      created_at: app.createdAt,
    };
  }
}
