import { addComponentsDir, addServerHandler, createResolver, defineNuxtModule } from "@nuxt/kit";
import type { ModuleRuntimeHooks } from "@nuxtjs/i18n";

export interface ModuleOptions {
    repo: string;
    owner: string;
}

export default defineNuxtModule<ModuleRuntimeHooks & ModuleOptions>({
    meta: {
        name: "common-ui.bs.js",
        configKey: "common-ui.bs.js",
    },
    // Default configuration options of the Nuxt module
    defaults: {
        owner: "DCC-BS",
    },
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        _nuxt.hook("i18n:registerModule", (register) => {
            register({
                langDir: resolver.resolve("./lang"),
                locales: [
                    {
                        code: "en",
                        file: "en.json",
                    },
                    {
                        code: "de",
                        file: "de.json",
                    },
                ],
            });
        });

        _nuxt.options.runtimeConfig["common-ui.bs.js"] = {
            repo: _options.repo,
            owner: _options.owner,
            githubToken: _options.githubToken,
        };

        addComponentsDir({
            path: resolver.resolve("./runtime/components"),
            global: true,
            pathPrefix: false,
        });

        addServerHandler({
            route: "/api/changelogs",
            method: "get",
            handler: resolver.resolve("./runtime/server/api/changelogs.get"),
        });
    },
});
