import { User } from "../../domain/entity/user.entity";
import { User as PrismaUser } from "../../generated/prisma";

export default abstract class UserMapper {
  static toEntity(data: PrismaUser): User {
    return {
      id: data.id,
      email: data.email,
      passwordHash: data.password_hash,
      firstName: data.first_name,
      lastName: data.last_name,
      companyName: data.company_name,
      apiKey: data.api_key,
      isDeleted: data.is_deleted,
      deletedAt: data.deleted_at,
      createdAt: data.created_at,
    };
  }
}
