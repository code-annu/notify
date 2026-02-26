import { App } from "../../domain/entity/app.entity";
import { App as PrismaApp, User } from "../../generated/prisma";
import UserMapper from "./user.mapper";

type PrismaAppWithOwner = PrismaApp & { owner: User };

export default abstract class AppMapper {
  static toEntity(app: PrismaAppWithOwner): App {
    return {
      id: app.id,
      owner: UserMapper.toEntity(app.owner),
      name: app.name,
      description: app.description,
      active: app.active,
      createdAt: app.created_at,
    };
  }
}
