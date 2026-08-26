import {
    addComponentsDir,
    addImportsDir,
    addPlugin,
    addServerHandler,
    addServerPlugin,
    createResolver,
    defineNuxtModule,
} from "@nuxt/kit";
import type { ModuleRuntimeHooks } from "@nuxtjs/i18n";
import { defu } from "defu";

declare module "@nuxt/schema" {
    interface NuxtHooks {
        "icon:clientBundleIcons"(icons: Set<string>): void;
    }
}

export default defineNuxtModule<ModuleRuntimeHooks>({
    meta: {
        name: "common-ui.bs.js",
        configKey: "common-ui.bs.js",
    },
    // Default configuration options of the Nuxt module
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        const commonUi = _nuxt.options.runtimeConfig.public.commonUi as
            | Record<string, unknown>
            | undefined;
        _nuxt.options.runtimeConfig.public.commonUi = defu(commonUi, {
            disableChangelog: false,
            disableDisclaimer: false,
            disableOnboarding: false,
            disableSystemStatus: false,
            disclaimer: {
                appName: "",
                version: "1.0.0",
            },
        });

        _nuxt.options.appConfig = defu(
            {
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
            },
            _nuxt.options.appConfig,
        );

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

        addPlugin(resolver.resolve("./runtime/plugins/remove-old-cookies"));

        addServerHandler({
            route: "/api/changelogs",
            method: "get",
            handler: resolver.resolve("./runtime/server/api/changelogs.get"),
        });

        addServerPlugin(
            resolver.resolve("./runtime/server/plugins/log-disabled-features"),
        );

        _nuxt.options.vite.server = _nuxt.options.vite.server || {};
        _nuxt.options.vite.server.fs = _nuxt.options.vite.server.fs || {};
        _nuxt.options.vite.server.fs.allow =
            _nuxt.options.vite.server.fs.allow || [];
        _nuxt.options.vite.server.fs.allow.push(
            resolver.resolve("./runtime/assets"),
        );

        _nuxt.hook("icon:clientBundleIcons", (icons) => {
            icons.add("lucide:graduation-cap");
            icons.add("lucide:grip");
            icons.add("lucide:rotate-ccw");
            icons.add("lucide:settings");
            icons.add("lucide:circle-alert");
            icons.add("lucide:mail");
            icons.add("lucide:undo");
            icons.add("lucide:redo");
            icons.add("lucide:x");
            icons.add("lucide:chevron-down");
            icons.add("lucide:triangle-alert");
        });
    },
});
