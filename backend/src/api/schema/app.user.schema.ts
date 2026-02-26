import { z } from "zod";

export const addAppUsersSchema = z.object({
  appUsers: z.array(
    z.object({
      externalId: z.string("externalId is required"),
      email: z.email("Enter valid email").optional(),
      phone: z.string().optional(),
    }),
  ),
});

export const updateAppUserSchema = z.object({
  email: z.email("Enter valid email").optional(),
  phone: z.string().optional(),
});
