import { User } from "../../domain/entity/user.entity";

export default abstract class ProfileResponse {
  static toSingle(user: User, message: string, code: number) {
    const { id, firstName, lastName, companyName, apiKey, createdAt } = user;
    return {
      status: "success",
      message,
      code,
      data: { id, firstName, lastName, companyName, apiKey, createdAt },
    };
  }
}
