import { z } from "zod";

export const appCreateSchema = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters long")
    .optional(),
});

export const appUpdateSchema = appCreateSchema.partial();
