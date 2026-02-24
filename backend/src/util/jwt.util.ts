import ENV from "../config/env";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export interface JWTPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = ENV.JWT_ACCESS_SECRET;
const ACCESS_TOKEN_EXPIRE = ENV.JWT_ACCESS_EXPIRES_IN;

const REFRESH_TOKEN_SECRET = ENV.JWT_REFRESH_SECRET;
const REFRESH_TOKEN_EXPIRE = ENV.JWT_REFRESH_EXPIRES_IN;

const generateTokens = (payload: JWTPayload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE as StringValue,
  });

  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE as StringValue,
  });

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;

const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;

export { generateTokens, verifyAccessToken, verifyRefreshToken };
