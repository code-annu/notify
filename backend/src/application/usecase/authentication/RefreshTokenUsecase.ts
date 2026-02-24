import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type ISessionRepository from "../../../domain/repository/ISessionRepository";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import { RefreshTokenInput } from "../../dto/auth.dto";
import { NotFoundError, UnauthorizedError } from "../../../domain/error/errors";
import { generateTokens } from "../../../util/jwt.util";

@injectable()
export default class RefreshTokenUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository,
  ) {}

  async execute(data: RefreshTokenInput) {
    const { token } = data;

    const session = await this.sessionRepo.findByToken(token);
    if (!session) {
      throw new UnauthorizedError("Invalid token session not found");
    }

    if (session.expiresAt < new Date()) {
      await this.sessionRepo.delete(session.id);
      await this.sessionRepo.deleteByUserId(session.user.id);
      throw new UnauthorizedError("Expired refresh token");
    }

    const user = await this.userRepo.findById(session.user.id);
    if (!user || user.isDeleted) {
      throw new NotFoundError(
        `user with id ${session.user.id} not found or account may be deleted`,
      );
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const newSession = await this.sessionRepo.update(session.id, {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return {
      session: newSession,
      accessToken,
    };
  }
}
