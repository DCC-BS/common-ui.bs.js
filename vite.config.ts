import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        // Plugin to externalize Nuxt imports
        {
            name: "externalize-nuxt",
            resolveId(id) {
                if (
                    id.startsWith("nuxt/") ||
                    id.startsWith("@nuxt/") ||
                    id === "nuxt"
                ) {
                    return { id, external: true };
                }
                return null;
            },
        },
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "@dcc-bs/common-ui.bs.js",
            formats: ["es", "umd"], // Specify browser-compatible formats
        },
        // Include CSS in the build
        cssCodeSplit: false,
        // Copy CSS files to dist
        copyPublicDir: false,
        rollupOptions: {
            external: [
                "vue",
                "motion-v",
                "@nuxt/ui",
                /^@nuxt\/ui\/components\//,
                "nuxt",
                /^nuxt\//,
                /^@nuxt\//,
            ],
            output: {
                globals: (id) => {
                    if (id === "vue") return "Vue";
                    if (id === "motion-v") return "MotionV";
                    if (id === "@nuxt/ui") return "NuxtUI";
                    if (id === "nuxt") return "Nuxt";
                    if (id === "nuxt/app") return "NuxtApp";

                    // Handle @nuxt/ui/components/* dynamically
                    if (id.startsWith("@nuxt/ui/components/")) {
                        const componentName = id
                            .replace("@nuxt/ui/components/", "")
                            .replace(".vue", "");
                        return `U${componentName}`;
                    }

                    return id;
                },
            },
        },
        target: "esnext", // Target modern browsers
        minify: true,
    },
    define: {
        // Ensure browser environment
        "process.env.NODE_ENV": JSON.stringify("production"),
    },
});
