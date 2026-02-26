import {
  AppUser as PrismaAppUser,
  App as PrismaApp,
} from "../../generated/prisma";
import { AppUser } from "../../domain/entity/app.user.entity";

type PrismaAppUserWithApp = PrismaAppUser & {
  app: PrismaApp;
};

export default abstract class AppUserMapper {
  static toEntity(appUser: PrismaAppUserWithApp): AppUser {
    const app = appUser.app;
    return {
      id: appUser.id,
      externalId: appUser.external_id,
      app: {
        id: appUser.app.id,
        ownerId: appUser.app.owner_id,
        name: appUser.app.name,
        active: appUser.app.active,
        description: app.description,
        createdAt: appUser.app.created_at,
      },
      isActive: appUser.is_active,
      email: appUser.email,
      phoneNumber: appUser.phone_number,
      createdAt: appUser.created_at,
    };
  }
}
