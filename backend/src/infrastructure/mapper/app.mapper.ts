import { App } from "../../domain/entity/app.entity";
import { App as PrismaApp, User } from "../../generated/prisma";
import UserMapper from "./user.mapper";

export default abstract class AppMapper {
  static toEntity(app: PrismaApp, owner: User): App {
    const { id, name, description, created_at, active } = app;
    return {
      id: id,
      owner: UserMapper.toEntity(owner),
      name: name,
      description: description,
      active: active,
      createdAt: created_at,
    };
  }
}
