import { defineNuxtModule, createResolver, addComponentsDir, installModule } from '@nuxt/kit'

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

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addComponentsDir({ path: resolver.resolve('./runtime/components'), global: true, pathPrefix: false });
    },
})