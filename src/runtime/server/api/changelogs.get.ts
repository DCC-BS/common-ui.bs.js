import fs from "node:fs";
import path from "node:path";
import { defineEventHandler, getQuery } from "h3";
import { z } from "zod";
import { useRuntimeConfig } from "#imports";
import type { Changelog } from "../../models/changelog.model";

const QuerySchema = z.object({
    lastRead: z.string().optional(),
});

const moduleConfigSchema = z.object({
    path: z.string(),
});

const MetaSchema = z.object({
    title: z.string(),
    version: z.string(),
    published_at: z.coerce.date(),
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const query = getQuery(event);
    const options = QuerySchema.parse(query);

    const moduleConfig = moduleConfigSchema.parse(config["common-ui.bs.js"]);

    const changelogPath = moduleConfig.path;
    const dirPath = path.resolve(process.cwd(), changelogPath);
    const allFiles = fs.readdirSync(dirPath);

    allFiles.sort((a, b) => b.localeCompare(a));

    const changelogs = [] as Changelog[];

    for (const fileName of allFiles) {
        const filePath = path.join(dirPath, fileName);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        const splits = fileContent.split("---");
        const metaJson = splits[0] as string;
        const markdown = splits.slice(1).join("---").trim();

        const meta = MetaSchema.parse(JSON.parse(metaJson));

        if (meta.version === options.lastRead) {
            break;
        }

        changelogs.push({
            title: meta.title,
            version: meta.version,
            body: markdown,
            published_at: meta.published_at,
        });
    }

    return changelogs;
});
