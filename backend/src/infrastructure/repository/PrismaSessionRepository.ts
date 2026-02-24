import { injectable } from "inversify";
import ISessionRepository from "../../domain/repository/ISessionRepository";
import {
  Session,
  SessionCreate,
  SessionUpdate,
} from "../../domain/entity/session.entity";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import SessionMapper from "../mapper/session.mapper";

@injectable()
export default class PrismaSessionRepository implements ISessionRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = prisma;
  }

  async create(data: SessionCreate): Promise<Session> {
    const { userId: user_id, token, expiresAt: expires_at } = data;

    const session = await this.db.session.create({
      data: { user_id, token, expires_at },
      include: { user: true },
    });
    return SessionMapper.toEntity(session, session.user);
  }

  async update(id: string, updates: SessionUpdate): Promise<Session> {
    const { token, expiresAt: expires_at } = updates;
    const session = await this.db.session.update({
      where: { id },
      data: { token, expires_at },
      include: { user: true },
    });
    return SessionMapper.toEntity(session, session.user);
  }

  async delete(id: string): Promise<void> {
    await this.db.session.delete({ where: { id } });
  }

  async findById(id: string): Promise<Session | null> {
    const session = await this.db.session.findUnique({
      where: { id },
      include: { user: true },
    });
    return session ? SessionMapper.toEntity(session, session.user) : null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const session = await this.db.session.findUnique({
      where: { token },
      include: { user: true },
    });
    return session ? SessionMapper.toEntity(session, session.user) : null;
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const session = await this.db.session.findMany({
      where: { user_id: userId },
      include: { user: true },
    });
    return session.map((session) =>
      SessionMapper.toEntity(session, session.user),
    );
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.db.session.deleteMany({ where: { user_id: userId } });
  }

  async deleteByToken(token: string): Promise<void> {
    await this.db.session.delete({ where: { token } });
  }

  async deleteExpiredForUser(userId: string): Promise<void> {
    await this.db.session.deleteMany({
      where: { user_id: userId, expires_at: { lt: new Date() } },
    });
  }
}
