import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  slides: z.any().optional(), // JSON field
  user_id: z.string(),
  outlines: z.array(z.string()),
  is_deleted: z.boolean().default(false),
  is_sellable: z.boolean().default(false),
  variant_id: z.string().nullable(),
  thumbnail: z.string().nullable(),
  theme_name: z.string().default("light"),
  created_at: z.date(),
  updated_at: z.date(),
});


export type ProjectType = z.infer<typeof projectSchema>;
