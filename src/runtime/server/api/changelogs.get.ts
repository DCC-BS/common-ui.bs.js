import { defineEventHandler } from "h3";
import { $fetch } from "ofetch";
import { EnvHttpProxyAgent } from "undici";
import { useRuntimeConfig } from "#internal/nitro";
import { ChangelogSchema } from "../../models/changelog.model";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();

    const moduleConfig = config["common-ui.bs.js"] as {
        repo: string;
        owner: string;
        project: string;
        githubToken: string;
    };

    const githubToken = config.githubToken || moduleConfig.githubToken;

    const repo = moduleConfig.repo;
    const owner = moduleConfig.owner;

    const agent = new EnvHttpProxyAgent();

    const response = await $fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${githubToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
        },
        dispatcher: agent,
    });

    const changelogs = ChangelogSchema.array().parse(response);
    return changelogs;
});