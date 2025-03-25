import { defineNuxtModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit'

export default defineNuxtModule({
    meta: {
        name: 'common-ui.bs.js',
        configKey: 'common-ui.bs.js',
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    async setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url);

        // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
        addComponentsDir({ path: resolver.resolve('./runtime/components'), global: true, pathPrefix: false });

        // composables
        addImportsDir(resolver.resolve('./runtime/composables'));
    },
})