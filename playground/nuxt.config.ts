// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["../src/module", "@nuxt/ui", "@nuxtjs/i18n"],
    "common-ui.bs.js": {
        changelogsPath: "playground/server/changelogs",
    },
    css: ["~/assets/css/main.css"],
    ui: {
        colorMode: false,
    },
    fonts: {
        providers: {
            bunny: false,
        },
    },
    typescript: {
        typeCheck: true,
        strict: true,
    },
    i18n: {
        defaultLocale: "en",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "de", name: "Deutsch", file: "de.json" },
        ],
    },
});
