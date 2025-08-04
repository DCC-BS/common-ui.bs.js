import { defineNuxtModule, createResolver, addComponentsDir, addImportsDir } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "common-ui.bs.js",
    configKey: "common-ui.bs.js"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      global: true,
      pathPrefix: false
    });
    addImportsDir(resolver.resolve("./runtime/composables"));
  }
});

export { module as default };
