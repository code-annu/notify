import { z } from "zod";

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(30, "First name must be at most 30 characters long")
    .optional(),
  lastName: z
    .string()
    .max(30, "Last name must be at most 30 characters long")
    .optional(),
  companyName: z
    .string()
    .min(3, "Company name must be at least 3 characters long")
    .max(100, "Company name must be at most 100 characters long")
    .optional(),
});
