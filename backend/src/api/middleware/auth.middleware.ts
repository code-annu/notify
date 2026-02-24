import { NextFunction, Request, Response } from "express";
import { JWTPayload, verifyAccessToken } from "../../util/jwt.util";
import { UnauthorizedError } from "../../domain/error/errors";
import { ErrorTypes } from "../../domain/error/ErrorType";

export interface AuthRequest extends Request {
  auth?: JWTPayload;
}

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
