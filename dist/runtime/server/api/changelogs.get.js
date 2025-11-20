import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defineEventHandler, getQuery } from "h3";
import { compare } from "semver";
import { z } from "zod";
import { useRuntimeConfig } from "#imports";
const QuerySchema = z.object({
  lastRead: z.string().optional()
});
const moduleConfigSchema = z.object({
  path: z.string()
});
const MetaSchema = z.object({
  title: z.string(),
  version: z.string(),
  published_at: z.coerce.date()
});
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const options = QuerySchema.parse(query);
  const moduleConfig = moduleConfigSchema.parse(config["common-ui.bs.js"]);
  const changelogPath = moduleConfig.path;
  const dirPath = path.resolve(process.cwd(), changelogPath);
  const allFiles = await fs.promises.readdir(dirPath);
  allFiles.sort(
    (a, b) => compare(b.replace(".md", ""), a.replace(".md", ""))
  );
  const changelogs = [];
  for (const fileName of allFiles) {
    const filePath = path.join(dirPath, fileName);
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const { content, data } = matter(fileContent);
    const meta = MetaSchema.parse(data);
    if (meta.version === options.lastRead) {
      break;
    }
    changelogs.push({
      title: meta.title,
      version: meta.version,
      body: content,
      published_at: meta.published_at
    });
  }
  return changelogs;
});
