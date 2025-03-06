import { defineNuxtModule, createResolver, addComponentsDir, installModule, addTemplate, addBuildPlugin } from '@nuxt/kit'
import defu from 'defu';

export default defineNuxtModule({
    meta: {
        name: 'common-ui.bs.js',
        configKey: 'common-ui.bs.js',
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    async setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        await installModule('@nuxt/ui', {
            config: {
                tailwindcss: {
                    content: [
                        // Include your module's components and other source files
                        resolver.resolve('./runtime/**/*.{vue,js,ts,jsx,tsx}'),
                        // Also include any CSS files that might contain Tailwind directives
                        resolver.resolve('./runtime/**/*.css'),
                    ]
                }
            }
        });

        // async function registerModule(name: string, key: string, options: Record<string, any>) {
        //     if (!hasNuxtModule(name)) {
        //         await installModule(name, options)
        //     } else {
        //         (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options)
        //     }
        // }

        // // Install Tailwind CSS module if not already installed
        // await installModule('@nuxtjs/tailwindcss', {
        //     // Configure Tailwind to detect utility classes in your module
        //     config: {
        //         content: [
        //             // Include your module's components and other source files
        //             resolver.resolve('./runtime/**/*.{vue,js,ts,jsx,tsx}'),
        //             // Also include any CSS files that might contain Tailwind directives
        //             resolver.resolve('./runtime/**/*.css'),
        //         ]
        //     },
        //     // Ensure PostCSS plugin is properly referenced
        //     plugins: {
        //         '@tailwindcss/postcss': {},
        //     },
        //     exposeConfig: true,
        //     injectPosition: 'first'
        // });

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addComponentsDir({ path: resolver.resolve('./runtime/components'), global: true, pathPrefix: false });
    },
})