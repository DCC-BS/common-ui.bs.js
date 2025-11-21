import { z } from "zod";
export declare const ChangelogSchema: z.ZodObject<{
    title: z.ZodString;
    version: z.ZodString;
    body: z.ZodString;
    published_at: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type Changelog = z.infer<typeof ChangelogSchema>;
