export default defineNuxtConfig({
    modules: ["../src/module", "@nuxtjs/tailwindcss"],
    tailwindcss: {
        config: {
            content: ["./src/**/*.vue"],
        },
    },
    devtools: { enabled: true },
    compatibilityDate: "2025-02-17",
    css: ["~/assets/css/main.css"],
});
