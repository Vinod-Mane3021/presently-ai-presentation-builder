import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  slides: z.any().optional(),
  userId: z.string().cuid(),
  outlines: z.array(z.string()),
  isDeleted: z.boolean().default(false),
  isSellable: z.boolean().default(false),
  variantId: z.string().optional(),
  thumbnail: z.string().url().optional(),
  themeName: z.string().default("light"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProjectType = z.infer<typeof projectSchema>;
