import { inject, injectable } from "inversify";
import TYPES from "../../../di/inversify.types";
import type IUserRepository from "../../../domain/repository/IUserRepository";
import type ISessionRepository from "../../../domain/repository/ISessionRepository";
import { SignupInput } from "../../dto/auth.dto";
import bcrypt from "bcrypt";
import { ConflictError } from "../../../domain/error/errors";
import { generateTokens } from "../../../util/jwt.util";
import generateApiKey from "generate-api-key";

@injectable()
export default class SignupUsecase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepo: IUserRepository,
    @inject(TYPES.ISessionRepository)
    private readonly sessionRepo: ISessionRepository,
  ) {}

  async execute(data: SignupInput) {
    const { email, password, firstName, lastName, companyName } = data;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new ConflictError(`user with email ${email} already exists`);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const apiKey = generateApiKey({ method: "base62", length: 32 }) as string;
    const user = await this.userRepo.create({
      email,
      passwordHash,
      firstName,
      companyName,
      lastName: lastName || null,
      apiKey: apiKey,
    });

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      email: user.email,
    });

    const session = await this.sessionRepo.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { session, accessToken };
  }
}
