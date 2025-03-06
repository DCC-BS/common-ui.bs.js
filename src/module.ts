import { defineNuxtModule, createResolver, addComponentsDir, installModule } from '@nuxt/kit'
import 'assets/common-ui-bs.css'

export default defineNuxtModule({
    meta: {
        name: 'common-ui.bs.js',
        configKey: 'common-ui.bs.js',
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    async setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        await installModule('@nuxt/ui');

        // Install Tailwind CSS module if not already installed
        await installModule('@nuxtjs/tailwindcss', {
            // Configure Tailwind to detect utility classes in your module
            config: {
                content: [
                    // Include your module's components and other source files
                    resolver.resolve('./runtime/**/*.{vue,js,ts,jsx,tsx}'),
                    // Also include any CSS files that might contain Tailwind directives
                    resolver.resolve('./runtime/**/*.css'),
                ]
            }
        });

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addComponentsDir({ path: resolver.resolve('./runtime/components'), global: true, pathPrefix: false });
    },
})