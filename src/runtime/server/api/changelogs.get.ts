import { defineEventHandler, getQuery } from "h3";
import { $fetch } from "ofetch";
import { EnvHttpProxyAgent } from "undici";
import { z } from "zod";
import { useRuntimeConfig } from "#imports";
import { ChangelogSchema } from "../../models/changelog.model";

const QuerySchema = z.object({
    lastRead: z.string().optional(),
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const query = getQuery(event);
    const options = QuerySchema.parse(query);

    const moduleConfig = config["common-ui.bs.js"] as {
        repo: string;
        owner: string;
    };

    const githubToken = config.githubToken;

    const repo = moduleConfig.repo;
    const owner = moduleConfig.owner;

    const agent = new EnvHttpProxyAgent();

    const response = await $fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${githubToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
            },
            dispatcher: agent,
        },
    );

    let changelogs = ChangelogSchema.array().parse(response);

    const newChangelogs = [];
    for (const changelog of changelogs) {
        if (changelog.tag_name === options.lastRead) {
            break;
        }
        newChangelogs.push(changelog);
    }
    changelogs = newChangelogs;

    return changelogs.filter(
        (changelog) => !changelog.draft && !changelog.prerelease,
    );
});
