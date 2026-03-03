import {
    addComponentsDir,
    addImportsDir,
    addServerHandler,
    createResolver,
    defineNuxtModule,
} from "@nuxt/kit";
import type { ModuleRuntimeHooks } from "@nuxtjs/i18n";
import { defu } from "defu";

// ui: {

// },
export default defineNuxtModule<ModuleRuntimeHooks>({
    meta: {
        name: "common-ui.bs.js",
        configKey: "common-ui.bs.js",
    },
    // Default configuration options of the Nuxt module
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        _nuxt.options.appConfig = defu(_nuxt.options.appConfig, {
            ui: {
                colors: {
                    primary: "purple",
                    secondary: "teal",
                    success: "green",
                    info: "blue",
                    warning: "yellow",
                    error: "red",
                },
            },
        });

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
