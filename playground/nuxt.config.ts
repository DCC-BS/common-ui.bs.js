export default defineNuxtConfig({
    modules: ["../src/module", "@nuxtjs/tailwindcss"],
    devtools: { enabled: true },
    compatibilityDate: "2025-02-17",
    css: ["~/assets/css/main.css"],
    tailwindcss: {
        config: {
            content: ["../src/runtime/**/*.vue"],
        },
    },
});
