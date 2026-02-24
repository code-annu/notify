import { injectable } from "inversify";
import IUserRepository from "../../domain/repository/IUserRepository";
import { User, UserCreate, UserUpdate } from "../../domain/entity/user.entity";
import { PrismaClient } from "../../generated/prisma";
import { prisma } from "../../config/prisma.client";
import UserMapper from "../mapper/user.mapper";

@injectable()
export default class PrismaUserRepository implements IUserRepository {
  private readonly db: PrismaClient;
  constructor() {
    this.db = prisma;
  }

  async create(data: UserCreate): Promise<User> {
    const { email, passwordHash, firstName, lastName, companyName, apiKey } =
      data;

    const user = await this.db.user.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        api_key: apiKey,
      },
    });
    return UserMapper.toEntity(user);
  }

  async update(id: string, updates: UserUpdate): Promise<User> {
    const { firstName, lastName, companyName, apiKey } = updates;

    const user = await this.db.user.update({
      where: { id },
      data: {
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        api_key: apiKey,
      },
    });
    return UserMapper.toEntity(user);
  }

  async delete(id: string): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: { is_deleted: true, deleted_at: new Date() },
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.user.findUnique({ where: { id } });
    return user ? UserMapper.toEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({ where: { email } });
    return user ? UserMapper.toEntity(user) : null;
  }
}
