import matter from "gray-matter";
import { defineEventHandler, getQuery } from "h3";
import { compare } from "semver";
import { z } from "zod";
import type { Changelog } from "../../types/changelog.model";

const QuerySchema = z.object({
    lastRead: z.string().optional(),
});

const MetaSchema = z.object({
    title: z.string(),
    version: z.string(),
    published_at: z.coerce.date(),
});

export default defineEventHandler(async (event) => {
    const storage = useStorage("assets:server:changelogs");

    const query = getQuery(event);
    const options = QuerySchema.parse(query);

    const allFiles = await storage.getKeys();

    console.log(allFiles);

    allFiles.sort((a, b) =>
        compare(b.replace(".md", ""), a.replace(".md", "")),
    );

    const changelogs = [] as Changelog[];

    for (const fileName of allFiles) {
        const fileContent = await storage.getItem(fileName);

        const { content, data } = matter(fileContent as string);

        const meta = MetaSchema.parse(data);

        if (meta.version === options.lastRead) {
            break;
        }

        changelogs.push({
            title: meta.title,
            version: meta.version,
            body: content,
            published_at: meta.published_at,
        });
    }

    return changelogs;
});
