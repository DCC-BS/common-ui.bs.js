import { z } from "zod";
export declare const ChangelogSchema: z.ZodObject<{
    name: z.ZodString;
    body: z.ZodString;
    draft: z.ZodBoolean;
    prerelease: z.ZodBoolean;
    created_at: z.ZodCoercedDate<unknown>;
    published_at: z.ZodCoercedDate<unknown>;
    tag_name: z.ZodString;
}, z.core.$strip>;
export type Changelog = z.infer<typeof ChangelogSchema>;
