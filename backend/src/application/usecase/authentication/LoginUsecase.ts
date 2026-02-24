import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import type ISessionRepository from "../../../domain/repository/ISessionRepository";
import { LoginInput } from "../../dto/auth.dto";
import { NotFoundError, UnauthorizedError } from "../../../domain/error/errors";
import bcrypt from "bcrypt";
import { generateTokens } from "../../../util/jwt.util";

@injectable()
export default class LoginUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository,
  ) {}

  async execute(data: LoginInput) {
    const { email, password } = data;

    const user = await this.userRepo.findByEmail(email);
    if (!user || user.isDeleted) {
      throw new NotFoundError(
        `user with email ${email} not found or account may be deleted`,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const session = await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return {
      session,
      accessToken,
    };
  }
}
