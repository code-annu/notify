import { Session } from "../../domain/entity/session.entity";
import {
  Session as PrismaSession,
  User as PrismaUser,
} from "../../generated/prisma";
import UserMapper from "./user.mapper";

export default abstract class SessionMapper {
  static toEntity(session: PrismaSession, user: PrismaUser): Session {
    return {
      id: session.id,
      user: UserMapper.toEntity(user),
      token: session.token,
      expiresAt: session.expires_at,
      createdAt: session.created_at,
    };
  }
}
