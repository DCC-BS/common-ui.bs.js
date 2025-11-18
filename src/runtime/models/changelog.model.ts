import { z } from "zod";


export const ChangelogSchema = z.object({
    name: z.string(),
    body: z.string(),
    draft: z.boolean(),
    prerelase: z.boolean(),
    created_at: z.coerce.date(),
    published_at: z.coerce.date(),
    tag_name: z.string(),
});

export type Changelog = z.infer<typeof ChangelogSchema>;