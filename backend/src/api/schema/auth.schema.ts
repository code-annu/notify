import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("valid email is required"),
  password: z
    .string("password is required")
    .min(6, "password must be at least 6 characters long"),
  firstName: z
    .string("first name is required")
    .min(3, "first name must be at least 3 characters long")
    .max(30, "first name must be at most 30 characters long"),
  lastName: z
    .string()
    .max(30, "last name must be at most 30 characters long")
    .optional(),
  companyName: z
    .string("company name is required")
    .min(3, "company name must be at least 3 characters long")
    .max(100, "company name must be at most 100 characters long"),
});

export const loginSchema = z.object({
  email: z.email("valid email is required"),
  password: z
    .string("password is required")
    .min(6, "password must be at least 6 characters long"),
});

export const refreshTokenSchema = z.object({
  token: z.string("token is required"),
});
