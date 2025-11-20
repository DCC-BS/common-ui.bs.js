import { z } from "zod";
export const ChangelogSchema = z.object({
  title: z.string(),
  version: z.string(),
  body: z.string(),
  published_at: z.coerce.date()
});
