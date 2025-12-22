import {
    addComponentsDir,
    addImportsDir,
    addServerHandler,
    createResolver,
    defineNuxtModule,
} from "@nuxt/kit";
import type { ModuleRuntimeHooks } from "@nuxtjs/i18n";

export default defineNuxtModule<ModuleRuntimeHooks>({
    meta: {
        name: "commonUiBs",
        configKey: "commonUiBs",
    },
    // Default configuration options of the Nuxt module
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

        _nuxt.options.i18n = {
            ...(_nuxt.options.i18n ?? {}),
            compilation: {
                strictMessage: false,
                escapeHtml: false,
                ...(_nuxt.options.i18n?.compilation ?? {}),
            },
        }

        addComponentsDir({
            path: resolver.resolve("./runtime/components"),
            global: true,
            pathPrefix: false,
        });

        addImportsDir(resolver.resolve("./runtime/composables"));

        addServerHandler({
            route: "/api/changelogs",
            method: "get",
            handler: resolver.resolve("./runtime/server/api/changelogs.get"),
        });
    },
});
