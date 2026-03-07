import { NextFunction, Request, Response } from "express";
import { JWTPayload, verifyAccessToken } from "../../util/jwt.util";
import { NotFoundError, UnauthorizedError } from "../../domain/error/errors";
import { ErrorTypes } from "../../domain/error/ErrorType";
import container from "../../di/inversify.config";
import TYPES from "../../di/inversify.types";
import IUserRepository from "../../domain/repository/IUserRepository";

export interface AuthRequest extends Request {
  auth?: JWTPayload;
}

const userRepo = container.get<IUserRepository>(TYPES.IUserRepository);

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError(
      "Missing Authorization header",
      ErrorTypes.MISSING_TOKEN,
    );
  }

  const token = authHeader.substring("Bearer ".length).trim();

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError(
      "Invalid or expired token",
      ErrorTypes.INVALID_TOKEN,
    );
  }
};

export const validateApiKey = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey) {
    throw new UnauthorizedError(
      "Api key is required to preform this action",
      ErrorTypes.MISSING_API_KEY,
    );
  }

  const user = await userRepo.findByApiKey(apiKey);
  if (!user) {
    throw new NotFoundError("Api key not found");
  }

  req.auth = {
    userId: user.id,
    email: user.email,
  };

  next();
};
